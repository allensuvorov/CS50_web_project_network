
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
    path("status/<int:userid>", views.status, name="status"),
    path("like_status/<int:postid>", views.status, name="like_status"),
    path("follow/<int:userid>", views.follow, name="follow"),
    path("unfollow/<int:userid>", views.unfollow, name="unfollow"),
    path("save/<int:postid>", views.save, name="save")
]
