from api.serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
)
from rest_framework import generics
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
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
        user.set_password(settings.CONFIG.GUEST_PWD)
        user.save()

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return Response(
            {
                "refresh": str(refresh),
                "access": str(access),
            }
        )
