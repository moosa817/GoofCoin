from api.serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    GoogleUserSerializer,
    ConvertUserSerializer,
    ProfileUpdateSerializer,
    PasswordUpdateSerializer,
)
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import generics
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from goofy_app.models import User
from random_username.generate import generate_username
from django.conf import settings


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class Register(generics.CreateAPIView):
    serializer_class = UserSerializer


class GuestView(APIView):
    def post(self, request):

        username = generate_username(1)[0]
        while User.objects.filter(username=username).exists():
            username = generate_username(1)[0]

        email = f"{username}@email.com"

        user = User(username=username, name=username.title(), email=email, guest=True)
        user.set_unusable_password()
        user.save()

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return Response(
            {
                "refresh": str(refresh),
                "access": str(access),
            }
        )


# login or signup with google
class GoogleUser(APIView):
    serializer_class = GoogleUserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            google_id = serializer.validated_data.get("google_id")
            name = serializer.validated_data.get("name")
            email = serializer.validated_data.get("email")
            pfp_url = serializer.validated_data.get("pfp_url")

            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                if not user.google:
                    return Response(
                        {"message": "User with this email already exists."}, status=400
                    )

                if user.google_id != google_id:
                    return Response(
                        {"message": "User with this email already exists."}, status=400
                    )
                refresh = RefreshToken.for_user(user)
                access = refresh.access_token
                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(access),
                    }
                )

            else:
                username = name.lower().replace(" ", "")
                number = 0
                while User.objects.filter(username=username).exists():
                    username = f"{username}{number}"
                    number += 1

                user = User(
                    username=username,
                    name=name,
                    email=email,
                    google=True,
                    google_id=google_id,
                )
                user.set_unusable_password()
                user.save_image_from_url(pfp_url)
                user.save()

                refresh = RefreshToken.for_user(user)
                access = refresh.access_token

                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(access),
                    }
                )


class ConvertGuest(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ConvertUserSerializer

    def get_object(self):
        return self.request.user


class UpdateUser(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileUpdateSerializer

    def get_object(self):
        return self.request.user


class PasswordChange(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordUpdateSerializer

    def put(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data.get("old_password")
            new_password = serializer.validated_data.get("new_password")
            confirm_password = serializer.validated_data.get("confirm_password")

            if new_password != confirm_password:
                return Response({"message": "Passwords do not match."}, status=400)

            if new_password == old_password:
                return Response(
                    {"message": "New password cannot be the same as the old password."},
                    status=400,
                )

            try:
                validate_password(new_password, user=request.user)
            except ValidationError as e:
                return Response({"message": list(e.messages)}, status=400)

            # validate old password
            if not request.user.check_password(old_password):
                return Response({"message": "Incorrect password."}, status=400)

            request.user.set_password(new_password)
            request.user.save()
            return Response({"message": "Password updated successfully."})
