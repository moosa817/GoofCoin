from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# Changing User class model


class User(AbstractUser):
    first_name = None
    last_name = None
    name = models.CharField(max_length=255, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    guest = models.BooleanField(default=False)