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
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        visibility = request.POST.get('visibility')
        content_type = request.POST.get('content_type')
        #send_to = request.POST.get('Send_To')

        new_post = Posts()
        new_post.title = title
        new_post.content = content
        new_post.visibility = visibility
        new_post.contentType = content_type
        new_post.uuid = uuid.uuid4()
        new_post.id = f"{request.build_absolute_uri('/')[:-1]}service/authors/{userId}/posts/{new_post.uuid}"
        new_post.source = new_post.id
        new_post.origin = new_post.id
        current_author = Authors.objects.get(uuid=userId)
        new_post.author = current_author
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
            "type": "post",
            "items": '[]'
        }
        return Response(responseData, status=200)

'''
def create_post(request, userId):
    if request.method == 'POST':
        form = post_form(request.POST, request.FILES)
        print(form)
        if form.is_valid():
            newPost = form.save(commit=False)
            newPost.id = f"{request.build_absolute_uri('/')}service/authors/{str(userId)}/posts/{str(newPost.uuid)}"
            newPost.source = newPost.id
            newPost.origin = newPost.id
            currentAuthor = Authors.objects.get(uuid=userId)
            newPost.author = currentAuthor
            newPost.save()
            # send to a friend
            if newPost.visibility == 'FRIENDS':
                sendTo = request.POST.get('Send_To')
                print(sendTo)

                inbox = Inbox.objects.get(author__username=sendTo)

                inbox.items.add(newPost)

            # notice a new post from me
            current_author_followers = Followers.objects.filter(follower=currentAuthor)
            # check if there are friends
            if current_author_followers.count() != 0:
                for item in current_author_followers:
                    follower = item.author
                    follower_inbox = Inbox.objects.get(author=follower)
                    follower_inbox.items.add(newPost)

            return HttpResponseRedirect(reverse("home-page", args=[userId]))
        else:
            return HttpResponse("Form is not valid")
    else:

        responseData = {
                "type": "666",
                "items": '[]'
            }

        return Response(responseData, status=200)
    # else:
    #     form = post_form()
        # return render(request, "post/create_new_post.html", {
        #     'form': form,
        #     'userId': userID,
        # })
'''

@login_required(login_url='/signin/')
@permission_classes([AllowAny])
def create_comment(request, userId, postId):
    if request.method == 'POST':
        form = Comment_form(request.POST)
        if form.is_valid():
            newComment = form.save(commit=False)
            newComment.id = f"{request.build_absolute_uri('/')}service/authors/{str(userId)}/posts/{str(postId)}/comments/{str(newComment.uuid)}"
            currentAuthor = Authors.objects.get(uuid=userId)
            newComment.author = currentAuthor

            currentPost = Posts.objects.get(uuid=postId)
            newComment.post = currentPost
            newComment.save()

            # comment added to inbox
            post_author = Posts.objects.get(uuid=postId).author
            post_author_inbox = Inbox.objects.get(author=post_author)
            post_author_inbox.comments.add(newComment)

            return HttpResponseRedirect(reverse("home-page", args=[userId]))
    # else:
    #     form = Comment_form()
        # return render(request, "post/create_new_post.html", {
        #     'form': form,
        #     'userId': userID
        # })


@login_required(login_url='/signin/')
@permission_classes([AllowAny])
def create_like(request, userId, postId):
    post = Posts.objects.get(uuid=postId).id
    post_uuid = Posts.objects.get(uuid=postId).uuid
    currentAuthor = Authors.objects.get(uuid=userId)
    author_name = currentAuthor.display_name
    summary = author_name + " Likes the post"
    if not Likes.objects.filter(author=currentAuthor, summary=summary, object=post, postId=post_uuid).exists():
        like = Likes.objects.create(author=currentAuthor, summary=summary, object=post, postId=post_uuid)
        like.save()
        if not Liked.objects.filter(postId=post).exists():
            receiver_liked = Liked.objects.create(postId=post)
        receiver_liked = Liked.objects.get(postId=post)
        receiver_liked.items.add(like)

        # Liked added to inbox
        post_author = Posts.objects.get(uuid=postId).author
        post_author_inbox = Inbox.objects.get(author=post_author)
        post_author_inbox.likes.add(receiver_liked)
    return HttpResponseRedirect(reverse("home-page", args=[userId]))

@permission_classes([AllowAny])
def share_post(request, userId, postId):
    currentAuthor = Authors.objects.filter(uuid=userId).first()
    selectedPost = Posts.objects.get(uuid=postId)

    if request.method == 'POST':
        sendTo = request.POST.get('Send_To')

        inbox = Inbox.objects.get(author__username=sendTo)

        inbox.items.add(selectedPost)

        return HttpResponseRedirect(reverse("home-page", args=[userId]))

    # else:
    #     return render(request, "post/share_posts.html", {
    #         'userId': userID,
    #         'post': selectedPost,
    #     })

@permission_classes([AllowAny])
def create_like_comment(request, userId, postId, commentID):
    comment = Comments.objects.get(uuid=commentID)
    comment_author = comment.author
    currentAuthor = Authors.objects.get(uuid=userId)

    sum = currentAuthor.display_name + " likes the comment"
    obj = commentID
    commId = comment.id

    if not Likes.objects.filter(author=currentAuthor, summary=sum, object=obj, postId=commId).exists():
        like = Likes.objects.create(author=currentAuthor, summary=sum, object=obj, postId=commId)
        like.save()
        if not Liked.objects.filter(postId=commId).exists():
            receiver_liked = Liked.objects.create(postId=commId)
        receiver_liked = Liked.objects.get(postId=commId)
        receiver_liked.items.add(like)

        # Liked added to inbox
        post_author_inbox = Inbox.objects.get(author=comment_author)
        post_author_inbox.likes.add(receiver_liked)

    return HttpResponseRedirect(reverse("home-page", args=[userId]))
