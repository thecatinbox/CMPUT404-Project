from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from allModels.models import *
from django.urls import reverse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import permissions, authentication
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.http import JsonResponse
from django.views import View
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@api_view(['GET', 'POST'])
@authentication_classes([authentication.BasicAuthentication])
@permission_classes([AllowAny])
def signIn(request):
    
    # login by username and password
    if request.method == 'POST':
        #return Response(f"{request.data.get('username')}", status=400)
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            userLogin = User.objects.get(username=username)
        except:
            return HttpResponse("Username does not exist")

        if userLogin.is_active == True:
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                current_user = request.user
                #return Response(f"current_user:{Authors.objects.get(username=current_user)}", status=200)
                current_author_id = Authors.objects.get(username=current_user).uuid
                #return Response(f"current_user:{current_author_id}", status=200)
                #url should be main/authorId
                return Response(f"current_author_id:{current_author_id}", status=200)
            else:
                return HttpResponse("The username or password are incorrect.")

        else:
            return Response("user is not active",status=200)
    else:
        responseData = {
            "type": "Sign Up",
            "items": '[]'
        }
        return Response(responseData, status=200)