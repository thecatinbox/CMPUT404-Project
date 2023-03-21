from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.signIn, name="signin"),
    path('signin/', views.signIn, name="signin")
]
