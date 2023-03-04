from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from allModels.models import *
from django.urls import reverse

def signIn(request):
    #login by username and password
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        try:
            userLogin = Authors.objects.get(username = username)
        except:
            return HttpResponse("Username does not exist")

        if userLogin.is_active == True:
            
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request,user)
                current_user = request.user
                current_author_id = single_author.objects.get(username=current_user).uuid
                #url should be main/authorId
                return HttpResponseRedirect(reverse("main",args=[current_authorId]))
            else:
                return HttpResponse("The username or password are incorrect.")
 
        else:
            return HttpResponse("Account is not active")
    else:
        return render(request,"signIn.html",{'error': 'Invalid login credentials'})

