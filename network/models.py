from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # pass
    following = models.ManyToManyField('self', blank=True, related_name="followers") # how to avoid following yourself
    def __str__(self):
        return f"{self.name}"

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts") # authors? really?
    text = models.CharField(max_length=100)
    likes_count = models.PositiveIntegerField() # stores the number of likes for this post
    likes_users = models.ManyToManyField(User, blank=True) # this table stores pairs User:Post
    date_time = models.DateTimeField(auto_now=False, auto_now_add=True) 
    # the date and time at which the post was made
    def __str__(self):
        return f"{self.text}"
