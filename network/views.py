from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django import forms

from .models import User, Post

class NewPostForm(forms.Form):
    newpost = forms.CharField(
        widget = forms.Textarea(attrs={
            'title': 'New post',
            'size': '30',
            'class': 'form-control',
            'placeholder': 'Type New Post Text'
        })
    )

def index(request):
    # if user is not authenticated than show index page with login and register links
    if not request.user.is_authenticated:
        return render(request, "network/index.html", {"message": "Welcome to Network, please register or login"})
    
    # else show user page

    # context = {"newpostform": NewPostForm()}
    
    # if Post.objects.all().exists():
    #     context["all_posts"]=Post.objects.all()
    #     print(context["all_posts"])
    
    all_posts = []
    if Post.objects.all().exists():
        all_posts=Post.objects.all().order_by("-date_time")

    context = {
        "newpostform": NewPostForm(),
        "all_posts": all_posts
    }
    return render(request, "network/index.html", context)

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def new_post(request):
    print("\n newpost \n")
    
    if request.method == "POST":
        form = NewPostForm(request.POST) # grab form data (user input)
        if form.is_valid():
            
            text = form.cleaned_data["newpost"]
            print("\n " + text + " \n")
            
            # add post to DB
            post = Post(
                author = request.user,
                text = text,
                )
            post.save()

    return HttpResponseRedirect(reverse("index"))

# def user_page(request):
    # user_posts = {}
    # if Post.objects.filter(author=request.user).exists():
    #     user_posts = Post.objects.filter(author=request.user)