from django.urls import path
from . import views

urlpatterns = [
    path("authors/<str:userId>/posts/create", views.create_post, name="create the post"),
    path("authors/<str:userId>/posts/<str:postId>/comment", views.create_comment, name="comment the post"),

    path("authors/<str:userId>/like/<str:postId>", views.create_like, name="like the post"),
    path("authors/<str:userId>/share/<str:postId>", views.share_post, name="share the page"),

    path("authors/<str:userId>/posts/<str:postId>/comments/<str:commentId>/likes", views.create_like_comment,
         name="like-comment-page"),

]