# serializers.py

from rest_framework import serializers
from goofy_app.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["name", "username", "email", "password"]

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            name=validated_data["name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        refresh = RefreshToken.for_user(instance)
        representation["refresh"] = str(refresh)
        representation["access"] = str(refresh.access_token)
        return representation


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        username_or_email = attrs.get("username")
        password = attrs.get("password")

        user = None
        if User.objects.filter(email=username_or_email).exists():
            user = User.objects.get(email=username_or_email)
            username = user.username
        elif User.objects.filter(username=username_or_email).exists():
            username = username_or_email
        else:
            raise serializers.ValidationError("No user found with this email/username.")

        credentials = {"username": username, "password": password}
        if username is None:
            raise serializers.ValidationError("Invalid email/username or password.")

        return super().validate(credentials)


class TransactionSerializer(serializers.Serializer):
    recipient = serializers.CharField()
    amount = serializers.FloatField()
    privateKeyFile = serializers.FileField()
