from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django.contrib import messages
from allModels.models import *
from django.urls import reverse
from django.contrib.auth.models import User
import uuid

def signUp(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        displayName = request.POST['displayName']
        github = request.POST['github']
        profileImage = request.FILES['profileImage']

        #check if username already exists
        if Authors.objects.filter(username=username).exists():
            return HttpResponse("Username already exists")
        else:
            #create user
            user = User.objects.create_user(username=username, password=password)
            user.save()
            #create author
            author = Authors.objects.create(username=username, password=password,displayName=displayName, github=github, profileImage=profileImage)
            author.save()
            #create inbox for author
            try:
                inbox = Inbox.objects.create(author=author)
                inbox.save()
            except:
                return HttpResponse("Inbox creation failed")
            return HttpResponseRedirect(reverse("home",args=[author.uuid]))
    else:
        return HttpResponse("Invalid request")
'''
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
'''
            