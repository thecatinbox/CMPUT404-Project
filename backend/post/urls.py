from django.urls import path
from . import views

urlpatterns = [
    path("authors/<str:userId>/posts", views.home_page, name="home-page"),
    path("authors/<str:userId>/posts/create", views.create_post, name="create-page"),
    path("authors/<str:userId>/posts/<str:postId>/comment", views.create_comment, name="comment-page"),

    path("authors/<str:userId>/like/<str:postId>", views.create_like, name="like-page"),
    path("authors/<str:userId>/share/<str:postId>", views.share_post, name="share-page"),

    path("authors/<str:userId>/posts/<str:postId>/comments/<str:commentId>/likes", views.create_like_comment,
         name="like-comment-page"),

]