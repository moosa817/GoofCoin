from api.serializers import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework import generics

from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class Register(generics.CreateAPIView):
    serializer_class = UserSerializer
