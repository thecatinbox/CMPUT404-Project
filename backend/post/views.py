from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from .post_form import post_form, Comment_form
from allModels.models import Posts, Comments, Likes, Liked
from allModels.models import Authors, Followers, FollowRequests
from rest_framework.response import Response
from django.urls import reverse
from django.contrib.auth.decorators import login_required
import uuid
from django.db.models import Q
from allModels.models import Inbox
import requests
from requests.auth import HTTPBasicAuth
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import permissions, authentication
from django.forms.models import model_to_dict
from django.http import JsonResponse
import json

'''
# Create your views here.
@login_required(login_url='/signin/')
def home_page(request, userID):
    boolean_check = False
    all_posts = Posts.objects.filter(visibility="PUBLIC")
    postcomments = {}

    # get comments from Comments model
    for post in all_posts:
        comment = Comments.objects.filter(post__uuid=post.uuid)
        postcomments[post] = comment

    if request.method == 'POST' and 'searched' in request.POST:
        searched = request.POST['searched']
        myself = Authors.objects.get(uuid=userID)
        followed = Authors.objects.filter(username=searched)
        # check
        if followed.count() != 0:
            boolean_check = False
            # check if author in follower list
            exist_myself = Followers.objects.filter(Q(author__uuid=userID) & Q(follower__username=searched))
            # if not
            if exist_myself.count() == 0:
                authorfollowers = Followers()
                authorfollowers.author = Authors.objects.get(uuid=userID)
                authorfollowers.follower = Authors.objects.get(username=searched)
                authorfollowers.save()

                # friend request if not author or followers
                if not FollowRequests.objects.filter(actor=authorfollowers.author,
                                                     object=authorfollowers.follower).exists():
                    actorName = authorfollowers.author.display_name
                    summary = actorName + " sent a friend request to you."
                    re = FollowRequests.objects.create(summary=summary, actor=authorfollowers.author,
                                                       object=authorfollowers.follower)
                    # request added to inbox
                    inbox = Inbox.objects.get(author=authorfollowers.follower)
                    inbox.FollowRequests.add(re)

            return HttpResponseRedirect(reverse("search-result", args=[userID, searched]))
        else:
            boolean_check = True

    masterauthor = Authors.objects.filter(uuid=userID)
    # return render(request, "post/index.html", {
    #     "boolean_check": boolean_check,
    #     "postcomments": postcomments,
    #     "all_posts": all_posts,
    #     "userId": userID,
    # })

'''
@login_required(login_url='/signin/')
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def create_post(request, userId):
    #return Response(f"{request.data}", status=400)
    if request.method == 'POST':
        
        title = request.data.get('title')
        #return Response(f"{title}", status=400)
        if "description" in request.data:
            description = request.data.get('description')
        else:
            description = ""
        if "content" in request.data:
            content = request.data.get('content')
        else:
            content = ""
        if "visibility" in request.data:
            visibility = request.data.get('visibility')
        else:
            visibility = "PUBLIC"
        if "contentType" in request.data:
            content_type = request.data.get('content_type')
        else:
            content_type = "text/plain"
        if "categories" in request.data:
            categories = request.data.get('categories')
        else:
            categories = ""
        uid = str(uuid.uuid4())

        tempCheck = 0
        if 'image' in request.FILES:
            image = request.FILES['image']
            image_path = default_storage.save(f'uploads/{userId}/{image.name}', image)
            contentImage = f"{request.build_absolute_uri('/')[:-1]}/{image_path}"
            content_type = 'image'  
            tempCheck = 1

        new_post = Posts()
        new_post.title = title
        new_post.description = description
        if tempCheck == 1:
            new_post.contentImage = contentImage
        else:
            new_post.content = content
        new_post.visibility = visibility
        new_post.contentType = content_type
        new_post.uuid = uid
        new_post.id = f"{request.build_absolute_uri('/')[:-1]}/authors/{userId}/posts/{uid}"
        new_post.source = new_post.id
        new_post.origin = new_post.id
        current_author = Authors.objects.get(uuid=userId)
        new_post.author = current_author
        new_post.categories = categories
        new_post.count = "0"
        new_post.save()

        # notice a new post from me
        current_author_followers = Followers.objects.filter(follower=current_author)
        if current_author_followers:
            for item in current_author_followers:
                follower = item.author
                follower_inbox = Inbox.objects.get(author=follower)
                follower_inbox.items.add(new_post)
        
        responseData = {
            "type": "post",
            "items": model_to_dict(new_post)
        }

        return Response(status=200)
    else:
        responseData = {
            "type": "creat post",
            "items": '[]'
        }
        return Response(responseData, status=200)

@login_required(login_url='/signin/')
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def create_comment(request, userId, postId):
    if request.method == 'POST':
        comment = request.data.get('comment')
        content_type = request.data.get('content_type', 'text/plain')
        uid = str(uuid.uuid4())

        newComment = Comments()
        newComment.comment = comment
        newComment.contentType = content_type
        newComment.uuid = uid
        newComment.id = f"{request.build_absolute_uri('/')[:-1]}/authors/{str(userId)}/posts/{str(postId)}/comments/{uid}"
        
        currentAuthor = Authors.objects.get(uuid=userId)
        newComment.author = currentAuthor

        currentPost = Posts.objects.get(uuid=postId)
        newComment.post = currentPost
        newComment.save()

        # Increment the post count and save the post
        currentPost.count = str(int(currentPost.count) + 1)
        currentPost.save()

        # comment added to inbox
        post_author = Posts.objects.get(uuid=postId).author
        post_author_inbox = Inbox.objects.get(author=post_author)
        post_author_inbox.comments.add(newComment)

        responseData = {
            "type": "creat comment",
            "items": model_to_dict(newComment)
        }

        return Response(responseData,status=200)

    else:
        responseData = {
            "type": "creat comment",
            "items": '[]'
        }
        return Response(responseData, status=200)


@login_required(login_url='/signin/')
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def create_like(request, userId, postId):
    if request.method == 'POST':
        post = Posts.objects.get(uuid=postId).id
        post_uuid = Posts.objects.get(uuid=postId).uuid
        currentAuthor = Authors.objects.get(uuid=userId)
        author_name = currentAuthor.displayName
        summary = author_name + " Likes your post"

        if not Likes.objects.filter(author=currentAuthor, summary=summary, object=post).exists():
            like = Likes.objects.create(author=currentAuthor, summary=summary, object=post)
            like.save()
            if not Liked.objects.filter(object=post).exists():
                receiver_liked = Liked.objects.create(object=post)
            liked = Liked.objects.get(object=post)
            liked.items.add(like)

            # Liked added to inbox
            post_author = Posts.objects.get(uuid=postId).author
            post_author_inbox = Inbox.objects.get(author=post_author)
            post_author_inbox.likes.add(liked)

            responseData = {
                    "type": "creat like",
                    "items": model_to_dict(like)
                }
        else:
            responseData = {
                    "type": "creat like exists",
                    "items": '[]'
                }

        return Response(responseData,status=200)

    else:
        responseData = {
            "type": "creat like",
            "items": '[]'
        }
        return Response(responseData, status=200)

@login_required(login_url='/signin/')
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def share_post(request, userId, postId):
    currentAuthor = Authors.objects.filter(uuid=userId).first()
    selectedPost = Posts.objects.get(uuid=postId)

    if request.method == 'POST':
        sendTo = request.data.get('sendTo')
        sendToAuthor = Authors.objects.get(uuid=sendTo)

        inbox = Inbox.objects.get(author=sendToAuthor)

        inbox.items.add(selectedPost)

        responseData = {
                    "type": "successfully shared",
                    "items": "[]"
                }

        return Response(responseData,status=200)


    else:
        responseData = {
            "type": "share post",
            "items": '[]'
        }
        return Response(responseData, status=200)

@login_required(login_url='/signin/')
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def create_like_comment(request, userId, postId, commentId):
    if request.method == 'POST':
        comment = Comments.objects.get(uuid=commentId)
        comment_author = comment.author
        currentAuthor = Authors.objects.get(uuid=userId)
        summary = currentAuthor.displayName + " Likes your comment"
        obj = comment.id

        if not Likes.objects.filter(author=currentAuthor, summary=summary, object=obj).exists():
            like = Likes.objects.create(author=currentAuthor, summary=summary, object=obj)
            like.save()
            if not Liked.objects.filter(object=obj).exists():
                receiver_liked = Liked.objects.create(object=obj)
            liked = Liked.objects.get(object=obj)
            liked.items.add(like)

            # Liked added to inbox
            post_author_inbox = Inbox.objects.get(author=comment_author)
            post_author_inbox.likes.add(receiver_liked)

            responseData = {
                    "type": "creat comment like",
                    "items": model_to_dict(like)
                }

        else:
            responseData = {
                    "type": "creat comment like exists",
                    "items": '[]'
                }

        return Response(responseData,status=200)

    else:
        responseData = {
            "type": "creat comment like",
            "items": '[]'
        }
        return Response(responseData, status=200)
    

