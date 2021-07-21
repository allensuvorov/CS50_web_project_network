from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField('self', symmetrical=False, related_name="followers", blank=True)
    def __str__(self):
        return f"{self.username}"

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    text = models.CharField(max_length=100)
    
    # stores the number of likes for this post
    likes_count = models.PositiveIntegerField(default=0) 
    
    # this table stores pairs Post:User
    likes_users = models.ManyToManyField(User, blank=True) 
    
    # the date and time at which the post was created
    date_time = models.DateTimeField(auto_now=False, auto_now_add=True) 
    def __str__(self):
        return f"USER: {self.author}, POST: {self.text}, {self.date_time.strftime('%d-%m-%Y %H:%M:%S')}, LIKES: {self.likes_count}"
