from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django.contrib import messages
from allModels.models import *
from django.urls import reverse
from django.contrib.auth.models import User
import uuid
from rest_framework.permissions import AllowAny
from rest_framework import permissions, authentication
from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
import json
from django.http import JsonResponse
from django.views import View
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def signUp(request):
    
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        try:
            username = data['username']
            password = data['password']
            displayName = data['displayName']
            if 'github' in data:
                github = data['github']
            else:
                github = ""
            if 'profileImage' in data:
                profileImage = data.FILES['profileImage']
            else:
                profileImage = ""
            #return Response({'error': f'Missing required field: {"66666666666"}'}, status=400)
        except KeyError as e:
            return Response({'error': f'Missing required field: {e}'}, status=400)
        #return Response({'error': f'Username:{username,password,displayName,github,profileImage}'}, status=400)
        #create user
        try:
            user = User.objects.get(username=username)
            return Response({'error': 'Username already exists'}, status=400)
        except User.DoesNotExist:
            user = User.objects.create_user(username=username, password=password)
            user.is_active = False
            user.save()

        
        #create author
        try:
            uid = str(uuid.uuid4())
            author = Authors.objects.create(username=username, 
                                            password=password,
                                            displayName=displayName, 
                                            github=github, 
                                            profileImage=profileImage, 
                                            uuid=uid,
                                            host="http://"+request.headers.get('host'), 
                                            id =f"{request.build_absolute_uri('/')[:-1]}/server/authors/{str(uid)}",
                                            #"http://"+request.headers.get('host')+"/author/"+str(uid),
                                            url=f"{request.build_absolute_uri('/')[:-1]}/server/authors/{str(uid)}"
                                            )
            author.save()
        except Exception as e:
        
            return Response({'error': f'Author creation failed:{e}'}, status=500)
        #create inbox for author

        try:
            inbox = Inbox.objects.create(author=author)
        except:
            return Response({'error': 'Inbox creation failed'}, status=500)

        return Response({'success': 'Author created successfully'}, status=201)
    else:
        responseData = {
            "type": "Sign Up",
            "items": '[]'
        }
        return Response(responseData, status=200)



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
            