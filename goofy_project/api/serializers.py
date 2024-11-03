# serializers.py

from rest_framework import serializers
from goofy_app.models import User, Block, Transaction
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
from PIL import Image, ImageOps
import io
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["name", "username", "email", "password"]

    def create(self, validated_data):
        user = User(
            username=validated_data["username"].lower(),
            email=validated_data["email"],
            name=validated_data["name"],
        )

        try:
            validate_password(validated_data["password"], user=user)
        except ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

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
        username_or_email = attrs.get("username").lower()
        password = attrs.get("password")

        user = None
        if User.objects.filter(email=username_or_email).exists():
            user = User.objects.get(email=username_or_email)
            username = user.username
        elif User.objects.filter(username=username_or_email).exists():
            username = username_or_email
        else:
            raise serializers.ValidationError("No user found with this email/username.")

        user = User.objects.get(username=username)
        if user.google:
            raise serializers.ValidationError("User signed up with Google.")

        credentials = {"username": username, "password": password}
        if username is None:
            raise serializers.ValidationError("Invalid email/username or password.")

        return super().validate(credentials)


class ConvertUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "name", "username", "email", "password"]

    def update(self, instance, validated_data):
        if instance.guest is False:
            raise serializers.ValidationError("User is not a guest.")

        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.name = validated_data.get("name", instance.name)
        instance.guest = False  # Ensuring guest is set to False

        try:
            validate_password(validated_data["password"], user=instance)
        except ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})

        instance.set_password(validated_data["password"])
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        refresh = RefreshToken.for_user(instance)
        representation["refresh"] = str(refresh)
        representation["access"] = str(refresh.access_token)
        return representation


class ProfileUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["name", "username", "email"]


class PasswordUpdateSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()


class MakeTransactionSerializer(serializers.Serializer):
    recipient = serializers.CharField()
    amount = serializers.FloatField()
    privateKeyFile = serializers.FileField()


class PfpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["pfp"]

    def update(self, instance, validated_data):
        # Get the uploaded image from validated_data
        pfp = validated_data.get("pfp", instance.pfp)

        # Crop, center, and resize the image to 128x128 pixels if a new image is uploaded
        if pfp:
            # Open the image using Pillow
            image = Image.open(pfp)

            # Crop, center, and resize the image to 128x128
            target_size = (128, 128)
            resized_image = ImageOps.fit(
                image,
                target_size,
                method=Image.Resampling.LANCZOS,
                centering=(0.5, 0.5),
            )

            # Save the resized image to an in-memory buffer
            buffer = io.BytesIO()
            resized_image.save(
                buffer, format="PNG"
            )  # Save as PNG or adjust format if necessary
            image_content = ContentFile(buffer.getvalue())

            # Update the `pfp` field with the resized image
            instance.pfp.save(
                f"{instance.username}_profile.png", image_content, save=False
            )

        # Save the instance with the updated profile picture
        instance.save()

        return instance


class GoogleUserSerializer(serializers.Serializer):
    google_id = serializers.CharField()
    name = serializers.CharField()
    email = serializers.EmailField()
    pfp_url = serializers.URLField()


class TransactionGetSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source="sender.username", read_only=True)
    recipient_username = serializers.CharField(
        source="recipient.username", read_only=True
    )
    sender_PublicKey = serializers.CharField(source="sender.public_key", read_only=True)
    recipient_PublicKey = serializers.CharField(
        source="recipient.public_key", read_only=True
    )

    class Meta:
        model = Transaction
        fields = [
            "id",
            "amount",
            "timestamp",
            "signature",
            "sender_username",
            "recipient_username",
            "sender_PublicKey",
            "recipient_PublicKey",
        ]


class BlockChainSerializer(serializers.ModelSerializer):
    transactions = TransactionGetSerializer(
        many=True
    )  # Use TransactionGetSerializer for transactions

    class Meta:
        model = Block
        fields = "__all__"
