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

signUp_example = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'username': openapi.Schema(type=openapi.TYPE_STRING, description='username'),
        'password': openapi.Schema(type=openapi.TYPE_STRING, description='password'),
        'displayName': openapi.Schema(type=openapi.TYPE_STRING, description='displayName'),
        'github': openapi.Schema(type=openapi.TYPE_STRING, description='github'),
        'profileImage': openapi.Schema(type=openapi.TYPE_FILE, description='profileImage'),

    },
    required=['username', 'password', 'displayName'],
)


@swagger_auto_schema(method='post', description="Sign Up with username,password and displayName", request_body=signUp_example)
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
                
            tempCheck = 0
            if 'image' in request.FILES:
                image = request.FILES['image']
                image_path = default_storage.save(f'uploads/{userId}/{image.name}', image)
                contentImage = f"{request.build_absolute_uri('/')[:-1]}/{image_path}"
                tempCheck = 1
        except KeyError as e:
            return Response({'error': f'Missing required field: {e}'}, status=400)

        try:
            user = User.objects.get(username=username)
            return Response({'error': 'Username already exists'}, status=400)
        except User.DoesNotExist:
            user = User.objects.create_user(username=username, password=password)
            user.is_active = False
            user.save()

        
        #create author
        try:
            if tempCheck == 1:
                profileImage = contentImage

            uid = str(uuid.uuid4())
            author = Authors.objects.create(username=username, 
                                            password=password,
                                            displayName=displayName, 
                                            github=github, 
                                            profileImage=profileImage, 
                                            uuid=uid,
                                            host="http://"+request.headers.get('host'), 
                                            id =f"{request.build_absolute_uri('/')[:-1]}/service/authors/{str(uid)}",
                                            #"http://"+request.headers.get('host')+"/author/"+str(uid),
                                            url=f"{request.build_absolute_uri('/')[:-1]}/service/authors/{str(uid)}"
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

 