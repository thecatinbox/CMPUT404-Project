from django.urls import path
from . import views


urlpatterns = [
    path('posts/',views.getAllPublicPosts,name="get_All_Public_Posts"),
    path('authors/',views.authorsList, name="authors_List"),
    path('authors/<str:pk>/',views.singleAuthor,name="single_Author"),
    path('authors/<str:pk>/posts/',views.Post,name="ones_Posts"),
    path('authors/<str:pk>/posts/<str:postsId>/',views.get_post,name="get_Posts"),
    path('authors/<str:pk>/posts/<str:postsId>/image',views.getImage,name="get_ImagePosts"),
    path('authors/<str:pk>/posts/<str:postsId>/comments',views.getComments,name="get_Comments"),
    path('authors/<str:pk>/posts/<str:postsId>/comments/<str:commentId>',views.getOneComment,name="get_OneComment"),
    path('authors/<str:pk>/followers/',views.getFollowers,name="get_Followers"),
    path('authors/<str:pk>/followers/<str:foreignPk>',views.oneFollower,name="one_Follower"),
    path('authors/<str:pk>/following/',views.getFollowing,name="get_Following"),
    path('authors/<str:pk>/followRequests/<str:foreignPk>',views.followRequest,name="make follow_Request"),
    path('authors/<str:pk>/liked',views.get_liked,name="get_Liked posts"),
    path('authors/<str:pk>/posts/<str:postsId>/likes',views.get_post_likes,name="get_Posts Likes"),
    path('authors/<str:pk>/comments/liked',views.get_liked_comments,name="get_LikedComments"),
    path('authors/<str:pk>/comments/<str:commentId>/likes',views.get_comment_likes,name="get_Comments Likes"),
    path('authors/<str:pk>/inbox',views.get_inbox,name="ones_Inbox"),
]