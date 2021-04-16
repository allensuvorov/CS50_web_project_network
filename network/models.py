from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass
# user: following (other users)

# class Post(models.Model):
#     text = models.CharField(max_length=100)
#     likes_count = models.PositiveIntegerField()
#     likes_users = models.ManyToManyField(User, blank=True)
#     def __str__(self):
#         return f"{self.text}"
