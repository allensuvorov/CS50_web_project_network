from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

# class Post():
# field text
# field likes counter
# field users M2M

# class Post(models.Model):
    # text = models.CharField(max_length=100)
    # likes = models.PositiveIntegerField()

    # def __str__(self):
        # return f"{self.text}"
