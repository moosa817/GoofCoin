from django.http import HttpResponse
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from goofy_app.models import User, Block
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q  # Import Q object
from .crypto_utils import generate_rsa_keypair
from .transactions import make_transaction, get_balance
from django.conf import settings
from api.serializers import TransactionSerializer, BlockChainSerializer, PfpSerializer
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework import generics


class UserSetup(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if user.is_new_user_setup_completed:
            return Response({"message": "User setup is already completed."})

        private_key, public_key = generate_rsa_keypair()

        user = request.user
        result = make_transaction(
            "system", request.user.username, 1000, settings.CONFIG.SYSTEM_PRIVATE_KEY
        )
        print(result)

        if result != "Transaction Successful":
            return Response({"message": "Failed to credit initial balance."})

        user.public_key = public_key.strip()
        user.is_new_user_setup_completed = True
        user.save()
        # initial balance

        response = HttpResponse(private_key, content_type="text/plain")
        response["Content-Disposition"] = 'attachment; filename="private_key.pem"'
        return response


class Transaction(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer
    parser_classes = [MultiPartParser, JSONParser]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            sender = request.user.username
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

            # Process the transaction
            response = make_transaction(sender, recipient, amount, private_key)

            try:
                receiver_user = User.objects.get(
                    Q(username=recipient)
                    | Q(public_key=recipient.strip().replace("\r\n", "\n"))
                )
            except User.DoesNotExist:
                receiver_user = None

            if response == "Transaction Successful" and receiver_user:
                return Response(
                    {
                        "message": response,
                        "error": False,
                    }
                )
            else:
                return Response({"message": response, "error": True})
        else:
            return Response(serializer.errors, status=400)


class ViewBlockchain(generics.ListAPIView):
    serializer_class = BlockChainSerializer
    queryset = Block.objects.all()


class VerifyToken(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.pfp:
            pfp = pfp.url
        else:
            pfp = None
        # will use https://api.dicebear.com/9.x/pixel-art/svg?seed=NAME&hair=short01&size=300&width=100&height=100

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
            }
        )


class Pfp(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = PfpSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
