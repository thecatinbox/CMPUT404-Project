from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.signIn, name="signIn"),
    path('signIn/', views.signIn, name="signIn")
]
