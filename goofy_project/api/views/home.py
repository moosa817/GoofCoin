from django.http import HttpResponse
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from goofy_app.models import User, Block, Transaction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q, Sum  # Import Q object
from .crypto_utils import generate_rsa_keypair
from .transactions import make_transaction, get_balance
from django.conf import settings
from api.serializers import (
    MakeTransactionSerializer,
    BlockChainSerializer,
    PfpSerializer,
    TransactionGetSerializer,
)
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework import generics
from decimal import Decimal


class UserSetup(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if user.is_new_user_setup_completed:
            return Response({"message": "User setup is already completed."})

        private_key, public_key = generate_rsa_keypair()

        sender = User.objects.get(username="system")

        result = make_transaction(
            sender,
            request.user,
            1000,
            settings.CONFIG.SYSTEM_PRIVATE_KEY.strip(),
        )

        if result != "Transaction Successful":
            return Response(
                {"message": "Failed to credit initial balance."}, status=400
            )

        user.public_key = public_key.strip()
        user.is_new_user_setup_completed = True
        user.save()
        # initial balance

        response = HttpResponse(private_key, content_type="text/plain")
        response["Content-Disposition"] = 'attachment; filename="private_key.pem"'
        return response


class TransactionView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MakeTransactionSerializer
    parser_classes = [MultiPartParser, JSONParser]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            recipient = serializer.validated_data.get("recipient")
            amount = serializer.validated_data.get("amount")
            private_key_file = serializer.validated_data.get("privateKeyFile")

            # Read and decode the private key file content
            try:
                private_key = private_key_file.read().decode("utf-8")
            except Exception as e:
                return Response(
                    {
                        "message": f"Failed to read private key file: {str(e)}",
                        "error": True,
                    },
                    status=400,
                )

            sender = request.user

            if not sender.is_new_user_setup_completed:
                return Response({"message": "User Setup Incomplete"}, status=400)
            try:
                receiver = User.objects.get(
                    Q(username=recipient) | Q(public_key=recipient)
                )
            except User.DoesNotExist:
                return Response({"message": "Invalid Receiver"}, status=400)

            if not receiver.is_new_user_setup_completed:
                return Response({"message": "Receiver Setup Incomplete"}, status=400)

            # Process the transaction, sending as objects
            response = make_transaction(sender, receiver, amount, private_key)

            transactions = Transaction.objects.filter(
                Q(sender=request.user) | Q(recipient=request.user)
            ).order_by("-timestamp")[:5]
            recent_transactions = TransactionGetSerializer(transactions, many=True).data

            if response == "Transaction Successful":
                return Response(
                    {
                        "message": response,
                        "error": False,
                        "balance": get_balance(sender),
                        "recentTransactions": recent_transactions,
                    }
                )
            else:
                return Response({"message": response, "error": True})
        else:
            return Response(serializer.errors, status=400)


class ViewBlockchain(APIView):
    serializer_class = BlockChainSerializer

    def get(
        self,
        request,
        username,
    ):
        if username == "all":
            blocks = Block.objects.all()
            transactions_count = Transaction.objects.count()
        else:
            try:
                user = User.objects.get(username=username)

            except User.DoesNotExist:
                return Response({"message": "User not found."}, status=404)

            blocks = Block.objects.filter(
                Q(transactions__sender=user) | Q(transactions__recipient=user)
            )
            transactions_count = Transaction.objects.filter(
                Q(sender=user) | Q(recipient=user)
            ).count()

        serializer = self.serializer_class(blocks, many=True)
        blocks_count = blocks.count()

        return Response(
            {
                "blocks": serializer.data,
                "blocks_count": blocks_count,
                "transactions_count": transactions_count,
                "average_transaction": 2,
            }
        )


class VerifyToken(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.pfp:
            pfp = request.user.pfp.url
        else:
            pfp = None
        # will use https://api.dicebear.com/9.x/pixel-art/svg?seed=NAME&hair=short01&size=300&width=100&height=100
        transactions = Transaction.objects.filter(
            Q(sender=request.user) | Q(recipient=request.user)
        ).order_by("-timestamp")[:5]
        recent_transactions = TransactionGetSerializer(transactions, many=True).data

        return Response(
            {
                "valid": True,
                "id": request.user.id,
                "username": request.user.username,
                "name": request.user.name,
                "email": request.user.email,
                "isGuest": request.user.guest,
                "publickey": request.user.public_key,
                "balance": get_balance(request.user),
                "pfp": pfp,
                "isGoogle": request.user.google,
                "SetupCompleted": request.user.is_new_user_setup_completed,
                "recentTransactions": recent_transactions,
            }
        )


class Pfp(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = PfpSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class GetProfile(APIView):
    permission_class = [IsAuthenticated]

    def get(self, request, username):
        if username == "system" or username == "admin":
            return Response({"message": "User not found."}, status=404)

        if not User.objects.filter(username=username).exists():
            return Response({"message": "User not found."}, status=404)

        user = User.objects.get(username=username)
        if user.pfp:
            pfp = user.pfp.url
        else:
            pfp = None

        transactions = Transaction.objects.filter(Q(sender=user) | Q(recipient=user))

        transactions_serialized = TransactionGetSerializer(transactions, many=True).data

        sent_amount = Transaction.objects.filter(sender=user).aggregate(
            total=Sum("amount")
        )["total"] or Decimal("0.00")

        received_amount = Transaction.objects.filter(recipient=user).aggregate(
            total=Sum("amount")
        )["total"] or Decimal("0.00")

        blocks = Block.objects.filter(
            Q(transactions__sender=user) | Q(transactions__recipient=user)
        )

        transactions_count = Transaction.objects.filter(
            Q(sender=user) | Q(recipient=user)
        ).count()

        serializer = BlockChainSerializer(blocks, many=True)
        blocks_count = blocks.count()

        return Response(
            {
                "id": user.id,
                "username": user.username,
                "name": user.name,
                "isGuest": user.guest,
                "publickey": user.public_key,
                "balance": get_balance(user),
                "sent_amount": sent_amount,
                "received_amount": received_amount,
                "pfp": pfp,
                "transactions": transactions_serialized,
                "blocks": serializer.data,
                "blocks_count": blocks_count,
                "transactions_count": transactions_count,
                "average_transaction": 2,
            }
        )


class GetTransactions(APIView):

    def get(self, request, username):
        user = User.objects.get(username=username)
        try:
            transactions = Transaction.objects.filter(
                Q(sender=user) | Q(recipient=user)
            )
        except Transaction.DoesNotExist:
            return Response({"message": "Transaction not found."}, status=404)

        transaction_serialized = TransactionGetSerializer(transactions, many=True).data

        sent_amount = Transaction.objects.filter(sender=user).aggregate(
            total=Sum("amount")
        )["total"] or Decimal("0.00")

        received_amount = Transaction.objects.filter(recipient=user).aggregate(
            total=Sum("amount")
        )["total"] or Decimal("0.00")

        return Response(
            {
                "transactions": transaction_serialized,
                "sent_amount": sent_amount,
                "received_amount": received_amount,
            }
        )
