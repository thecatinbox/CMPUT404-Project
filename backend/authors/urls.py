from django.urls import path
from . import views

urlpatterns = [
    path("authors/<str:userId>/search", views.search, name="search_users"),
    path("logout", views.logout, name='author_logout'),
]