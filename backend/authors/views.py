from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User, auth
from allModels.models import Followers, Authors
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse


@login_required(login_url='/signin/')
def search(request, userID):
    # user_object = User.objects.get(username=request.user.username)
    # user_profile = Profile.objects.get(user=user_object)

    if request.method == 'POST':
        username = request.POST['username']
        username_object = User.objects.filter(username__icontains=username)
        author = User.objects.get(id=userID)
        if not username_object:
            messages.error(request, "No users found for the given search query.")
        username_profile = []
        for users in username_object:
            username_profile.append(users.id)
        username_profile_list = list(username_profile)
        print(username_profile_list)
    return HttpResponseRedirect(reverse("home-page", args=[userID]))


@login_required(login_url='/signin/')
def logout(request):
    auth.logout(request)
    return redirect('/signin/')
