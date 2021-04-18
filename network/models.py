from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass
    # following = models.ManyToManyField(User, blank=true)
    # def __str__(self):
    #     return f"User {self.name}"
    
# posts: posts of that user 

# class Post(models.Model):
#     text = models.CharField(max_length=100)
#     likes_count = models.PositiveIntegerField()
#     likes_users = models.ManyToManyField(User, blank=True)
#     def __str__(self):
#         return f"{self.text}"
