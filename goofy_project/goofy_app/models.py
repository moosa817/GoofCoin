from django.db import models
from django.contrib.auth.models import AbstractUser
import hashlib
import uuid
import json
from django.utils import timezone
import requests
from io import BytesIO
from django.core.files.base import ContentFile
from django.utils.timezone import now, timedelta
import random

# Create your models here.
# Changing User class model


class User(AbstractUser):
    first_name = None
    last_name = None
    name = models.CharField(max_length=255, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    guest = models.BooleanField(default=False)
    google = models.BooleanField(default=False)
    google_id = models.CharField(max_length=255, blank=True, null=True)
    public_key = models.TextField()
    is_new_user_setup_completed = models.BooleanField(default=False)
    pfp = models.ImageField(upload_to="profile_pictures/", blank=True, null=True)

    password_reset_code = models.CharField(max_length=6, blank=True, null=True)
    code_generated_at = models.DateTimeField(blank=True, null=True)

    def generate_reset_code(self):

        self.password_reset_code = f"{random.randint(100000, 999999)}"
        self.code_generated_at = now()
        self.save()

    def is_reset_code_valid(self):
        if self.code_generated_at:
            return now() - self.code_generated_at < timedelta(
                minutes=10
            )  # Example: 10 minutes
        return False

    def save_image_from_url(self, url):
        # Send a request to fetch the image from the URL
        response = requests.get(url)

        if response.status_code == 200:
            # Use BytesIO to handle the image in memory
            img_io = BytesIO(response.content)
            self.pfp.save(
                f"image_{self.pk}.jpg", ContentFile(img_io.getvalue()), save=False
            )
            self.save()


class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(
        User, related_name="sent_transactions", on_delete=models.CASCADE
    )
    recipient = models.ForeignKey(
        User, related_name="received_transactions", on_delete=models.CASCADE
    )
    amount = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    signature = models.TextField()  # Store signature of the transaction

    def __str__(self):
        return f"{self.sender.username}->{self.recipient.username}:{self.amount}"


class Block(models.Model):
    index = models.IntegerField(unique=True)
    previous_block = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        related_name="next_blocks",
        null=True,
        blank=True,
    )
    timestamp = models.DateTimeField(default=timezone.now)
    nonce = models.IntegerField()
    hash = models.CharField(max_length=64, unique=True)
    transactions = models.ManyToManyField("Transaction")

    def save(self, *args, **kwargs):
        # Save the block without transactions first to get an ID
        if not self.pk:  # If the block hasn't been saved to the database yet
            super().save(*args, **kwargs)

        # Compute the hash and save the block again with transactions
        self.hash = self.compute_hash()
        super().save(*args, **kwargs)

    def compute_hash(self):
        block_dict = self.to_dict()
        block_string = json.dumps(block_dict, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()

    def to_dict(self):
        return {
            "index": self.index,
            "previous_hash": self.previous_block.hash if self.previous_block else None,
            "timestamp": str(self.timestamp),
            "nonce": self.nonce,
            "transactions": [str(tx.id) for tx in self.transactions.all()],
        }

    def __str__(self):
        return f"Block {self.index} with hash {self.hash}"
