from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django.contrib import messages
from allModels.models import *
from django.urls import reverse
import uuid

def sign_up(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        #check if username already exists
        if Authors.objects.filter(username=username).exists():
            return HttpResponse("Username already exists")
        else:
            #create user
            user = Authors.objects.create_user(username=username, password=password)
            user.save()
            #create author
            author = Authors.objects.create(username=username, password=password)
            author.save()
            #create inbox for author
            try:
                inbox = Inbox.objects.create(author=author)
                inbox.save()
            except:
                return HttpResponse("Inbox creation failed")
            return HttpResponseRedirect(reverse("userInfo",args=[author.uuid]))
    else:
        return render(request,"signUp.html")

def user_info(request, author_id):
    if request.method == 'POST':
        #get author
        author = Authors.objects.get(uuid=author_id)
        #update author info
        author.displayName = request.POST['displayName']
        author.github = request.POST['github']
        author.save()
        #create single_author
        single_author = Single_Author.objects.create(uuid=author_id, username=author.username, displayName=author.displayName, github=author.github)
        single_author.save()
        #create host
        #host = Host.objects.create(host="http://

            