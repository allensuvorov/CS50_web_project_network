from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # pass
    following = models.ManyToManyField(User, blank=true)
    def __str__(self):
        return f"User {self.name}"

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=100)
    likes_count = models.PositiveIntegerField() # stores the number of likes for this post
    likes_users = models.ManyToManyField(User, blank=True) # this table stores pairs User:Post 
    def __str__(self):
        return f"{self.text}"
