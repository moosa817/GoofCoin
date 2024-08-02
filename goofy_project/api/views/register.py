from rest_framework.response import Response

# import viewclass restframework
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.serializers import UserSerializer
from rest_framework import generics
from goofy_app.models import User


class Register(generics.CreateAPIView):
    serializer_class = UserSerializer
