from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
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
    
    # get all posts from database
    context = {}
    if Post.objects.all().exists():
        context["all_posts"] = Post.objects.all().order_by("-date_time")
        
    # if user is not authenticated than show message and all posts
    if not request.user.is_authenticated:
        context["message"] = "Welcome to Network, please register or login"
    
    # else show user page with form and all posts
    else:
        context["newpostform"] = NewPostForm()
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

def profile(request):
    # if user is not authenticated than open index page
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
    # get user posts from DB
    user_posts = []
    if Post.objects.filter(author=request.user).exists():
        user_posts = Post.objects.filter(author=request.user).order_by("-date_time")
    
    # print(user_posts[0])
    # print(request.user.following.count())
    # print(request.user.following.all())
    # get other users
    other_users = User.objects.exclude(id=request.user.id).values()

    context = {
        "user_posts": user_posts,
        "following_count": request.user.following.count(), 
        "followers_count": request.user.followers.count(), # get number of followers of user
        "other_users": other_users,
        "following_users": request.user.following.all() # let's get a list of all users being followed
    }
    return render(request, "network/profile.html", context)

def status(request, userid):
    follow_status = False
    if User.objects.get(id=userid) in request.user.following.all():
        follow_status = True
    print(userid)
    print (follow_status)
    return JsonResponse ({'following': follow_status})

def follow(request, userid):
    request.user.following.add(User.objects.get(id=userid))
    print ("follow: " + str(User.objects.get(id=userid)))
    return JsonResponse ({'following': True})

def unfollow(request, userid):
    request.user.following.remove(User.objects.get(id=userid))
    print ("unfollow: " + str(User.objects.get(id=userid)))
    return JsonResponse ({'following': False})

def following(request):
    # if user is not authenticated than open index page
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
    


