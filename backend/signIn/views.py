from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from allModels.models import *
from django.urls import reverse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import permissions, authentication
from django.forms.models import model_to_dict
from rest_framework.response import Response

@api_view(['GET', 'POST'])
@authentication_classes([authentication.BasicAuthentication])
@permission_classes([AllowAny])
def signIn(request):
    # login by username and password
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        try:
            userLogin = Authors.objects.get(username=username)
        except:
            return HttpResponse("Username does not exist")

        if userLogin.is_active == True:

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                current_user = request.user
                current_author_id = Authors.objects.get(username=current_user).uuid

                #url should be main/authorId
                return HttpResponseRedirect(reverse("home",args=[current_author_id]))
            else:
                return HttpResponse("The username or password are incorrect.")

        else:
            return Response(status=200)
    else:
        responseData = {
            "type": "Sign Up",
            "items": '[]'
        }
        return Response(responseData, status=200)