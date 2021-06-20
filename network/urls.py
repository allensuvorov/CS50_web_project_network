
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newpost", views.new_post, name="newpost"),
    path("profile", views.profile, name="profile"),
    path("follow/<int:userid>", views.follow, name="follow"),
    path("status/<int:userid>", views.status, name="status"),
    path("unfollow/<int:userid>", views.unfollow, name="unfollow")
]
