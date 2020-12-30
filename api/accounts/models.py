from django.db import models
from django.contrib.auth.models import AbstractUser

from . import managers


class User(AbstractUser):
    username = None
    email = models.EmailField('Email address', unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = managers.UserManager()

    def __str__(self):
        return self.email
