
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newpost", views.new_post, name="newpost"),
    path("profile", views.profile, name="profile"),
    path("following", views.following, name="following"),
    
    #API Routes
    path("follow_status/<int:userid>", views.follow_status, name="follow_status"),
    path("follow/<int:userid>", views.follow, name="follow"),
    path("unfollow/<int:userid>", views.unfollow, name="unfollow"),
    path("save/<int:postid>", views.save, name="save"),
    path("like_status/<int:postid>", views.like_status, name="like_status"),
    path("like/<int:postid>", views.like, name="like"),
    path("unlike/<int:postid>", views.unlike, name="unlike")
]
