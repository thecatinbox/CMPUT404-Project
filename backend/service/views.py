from django.shortcuts import render
from django.http import HttpResponseRedirect, FileResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from rest_framework.response import Response
from rest_framework import permissions, authentication
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes, authentication_classes, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from .serializers import AuthorSerializer, PostsSerializer, LikedSerializer, CommentSerializer, FollowRequestSerializer, ShareSerializer
from allModels.models import Authors, Followers, FollowRequests
from allModels.models import Posts, Comments, Likes, Liked, Shares
from allModels.models import Inbox
from rest_framework.permissions import AllowAny
import uuid


def getURLId(url):
    return url.split('/')[-1]


def paginate(request,objects):
    """
    Paginates a list of objects.

    Args:
        objects (list): The list of objects to paginate.

    Returns:
        - The paginated objects.
    """
    page=1
    page_size=10
    start_index = page * page_size - page_size
    end_index = page * page_size

    objects = objects[start_index:end_index]
    
    return objects

'''
def pagination(request,object):
    """
    This function is hand write pagination method, to get the page and size of user want,
    that returns the range of objects to them
    """
    absURL = request.build_absolute_uri()
    value = absURL.split('?')[1].split('&')
    page = int(value[0].split('=')[1])
    size = int(value[1].split('=')[1])
    fromNum = page * size - size
    toNum = page * size

    object = object[fromNum:toNum]

    return object
'''
"""
Authors 
"""

@api_view(['GET'])
@permission_classes([AllowAny])
def authorsList(request):
    """
    This view is used to display all authors information
    """
    authors = Authors.objects.all()

    # # Get page and size from query parameters
    # page = int(request.query_params.get('page', 1))
    # page_size = int(request.query_params.get('size', 10))

    # paginated_authors, total_pages, current_page = paginate(authors, page, page_size)
    paginated_authors = paginate(request,authors)
    if not paginated_authors:
        return Response(status=404)

    itemsList = []
    for item in paginated_authors:
        dict = {}
        serializer = AuthorSerializer(item)
        data = serializer.data

        for k, v in data.items():
            dict[k] = v

        dict['displayName'] = data['displayName']

        itemsList.append(dict)

    responseData = {
        "type": "authors",
        "items": itemsList,
    }

    return Response(responseData, status=200)


"""
Single Author
"""


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def singleAuthor(request, pk):
    """
    This view is used to display and update one author information
    """
    try:
        author = Authors.objects.get(uuid=pk)
    except Authors.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = AuthorSerializer(author)
        data = serializer.data
        data['displayName'] = data.pop('displayName')
        responseData = {
            "type": "authors",
            "items": data
        }
        return Response(responseData, status=200)

    elif request.method == 'POST':
        author.github = request.data.get('github', author.github)
        author.profileImage = request.data.get('profileImage', author.profileImage)
        author.host = request.data.get('host', author.host)
        author.url = request.data.get('url', author.url)
        author.save()
        return Response(status=200)


"""
Posts
"""


@api_view(['GET'])
@permission_classes([AllowAny])
def getAllPublicPosts(request):
    """
    This view will get all public posts
    """
    posts = Posts.objects.filter(visibility='PUBLIC').prefetch_related('author')
    items_list = []

    for post in posts:
        data = PostsSerializer(post).data
        author_data = AuthorSerializer(post.author).data
        author_data['displayName'] = author_data.pop('displayName')
        categories = data.pop('categories')
        comments_count = data.pop('count')
       
        item = {
            **data,
            'author': author_data,
            'categories': categories,
            'count': comments_count,
        }
        items_list.append(item)

    response_data = {
        "type": "posts",
        "items": items_list
    }

    return Response(response_data, status=200)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def Post(request, pk):
    """
    This view is used to display posts of a given author and create a new post
    """
    # Display posts of a given author
    if request.method == 'GET':
        item_list = []
            
        author = Authors.objects.get(uuid=pk)
        serializeAuthor = AuthorSerializer(author)

        try:     
            posts = Posts.objects.filter(author=author)
            posts = paginate(request, posts)
            

            if not posts:
                responseData = {
                    "type": "posts",
                    "items": item_list
                }
                print(responseData)
                return Response(responseData, status=200)

            for item in posts:
                dict = {}
                serializer = PostsSerializer(item)
                data = serializer.data
                author_dict = {}
                for k, v in data.items():
                    dict[k] = v
                for k, v in serializeAuthor.data.items():
                    author_dict[k] = v
                author_dict['displayName'] = serializeAuthor.data['displayName']
                author_dict.pop('username')
                categories = data['categories']
                postsId = data['uuid']
                dict.pop('categories')
                dict['categories'] = categories
                dict['author'] = author_dict
                dict['count'] = item.count
                item_list.append(dict)

            responseData = {
                "type": "posts",
                "items": item_list
            }

            return Response(responseData, status=200)

        except Exception as e:

            for item in posts:
                dict = {}
                serializer = PostsSerializer(item)
                data = serializer.data
                author_dict = {}
                for k, v in data.items():
                    dict[k] = v
                for k, v in serializeAuthor.data.items():
                    author_dict[k] = v
                author_dict['displayName'] = serializeAuthor.data['displayName']
                author_dict.pop('username')
                categories = data['categories']
                postsId = data['uuid']
                dict.pop('categories')
                dict['categories'] = categories
                dict['author'] = author_dict
                dict['count'] = item.count
                item_list.append(dict)


            # Return empty item_list if there was an exception
            responseData = {
                "type": "posts",
                "items": item_list
            }
            print(responseData)
            return Response(responseData, status=200)

    # Create new post
    elif request.method == 'POST':
        currentAuthor = Authors.objects.filter(uuid=pk).first()
        new_post = request.data
        new_postId = uuid.uuid4()
        id = f"{request.build_absolute_uri('/')[:-1]}/server/authors/{str(pk)}/posts/{str(new_postId)}"
        newPost = Posts.objects.create(
            title=new_post['title'],
            uuid=new_postId,
            id=id,
            source=new_post['source'],
            origin=new_post['origin'],
            description=new_post['description'],
            contentType=new_post['contentType'],
            content=new_post['content'],
            author=currentAuthor,
            categories=new_post['categories'],
            count=0,
            visibility=new_post['visibility'],
        )
        newPost.save()
        return Response(status=200)
    return Response(status=400)  # Return bad request if method is not GET or POST


"""
POST Manipulation
"""

##############################################################
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def get_post(request, pk, postsId):
    """
    Get, update, delete or create a specific post.
    """
    # Get a specific post
    if request.method == 'GET':
        post = Posts.objects.get(uuid=postsId)
        if not post:
            return Response(status=404)

        post_dict = {
            'title': post.title,
            'id': post.id,
            'uuid': post.uuid,
            'source': post.source,
            'description': post.description,
            'contentType': post.contentType,
            'content': post.content,
            'origin': post.origin,
            'published': post.published,
            'visibility': post.visibility,
            'categories': post.categories,
            'author': {
                'id': post.author.id,
                'uuid': post.author.uuid,
                'displayName': post.author.username,
                'github': post.author.github,
                'host': post.author.host,
                'url': post.author.url,
            },
            'count': post.count,
        }
        return Response(post_dict)

    # Update an existing post
    elif request.method == 'PUT':
        post = Posts.objects.get(author__uuid=pk, uuid=postsId)
        if not post:
            return Response(status=404)

        post.title = request.data.get('title', post.title)
        post.source = request.data.get('source', post.source)
        post.description = request.data.get('description', post.description)
        post.contentType = request.data.get('contentType', post.contentType)
        post.content = request.data.get('content', post.content)
        post.visibility = request.data.get('visibility', post.visibility)
        post.categories = request.data.get('categories', post.categories)
        post.save()

        return Response(status=200)

    # Delete a post
    elif request.method == 'DELETE':
        post = Posts.objects.get(author__uuid=pk, uuid=postsId)
        if not post:
            return Response(status=404)

        post.delete()
        return Response(status=204)

    # Create a new post
    # elif request.method == 'POST':
    #     if not request.user.is_authenticated:
    #         return Response(status=status.HTTP_401_UNAUTHORIZED)

    #     current_author = Authors.objects.filter(uuid=pk).first()
    #     if not current_author:
    #         return Response(status=status.HTTP_404_NOT_FOUND)

    #     new_post_id = uuid.uuid4()
    #     new_post = Posts.objects.create(
    #         title=request.data.get('title'),
    #         uuid=new_post_id,
    #         id=f"{request.build_absolute_uri('/')}/service/authors/{pk}/posts/{new_post_id}",
    #         source=request.data.get('source'),
    #         origin=request.data.get('origin'),
    #         description=request.data.get('description'),
    #         contentType=request.data.get('contentType'),
    #         content=request.data.get('content'),
    #         author=current_author,
    #         categories=request.data.get('categories'),
    #         visibility=request.data.get('visibility', 'PUBLIC'),
    #     )
    #     new_post.save()

    #     return Response(status=201)


"""
Image Posts
"""

@api_view(['GET'])
@permission_classes([AllowAny])
def getImage(request, pk, postsId):
    """
    This is in order to display the image post or the image in the post
    """
    try:
        post = Posts.objects.get(uuid=postsId)
    except Posts.DoesNotExist:
        raise Http404()

    if not post.post_image:
        return HttpResponseBadRequest("This post does not have an image.")

    img_path = post.post_image.path
    img = open(img_path, 'rb')

    return FileResponse(img)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def getComments(request, pk, postsId):
    """
    Get comments for a post and paginated
    """
    if request.method == 'GET':
        item_list = []
        comments = Comments.objects.filter(post__uuid=postsId)
        try:
            comments = paginate(request, comments)

            for comment in comments:
                serializer = CommentSerializer(comment)
                data = serializer.data
                author = Authors.objects.get(username=data['author'])
                serializeAuthor = AuthorSerializer(author)
                author_data = serializeAuthor.data
                author_data['displayName'] = author_data.pop('displayName')
                comment_data = {**data, 'author': author_data}
                item_list.append(comment_data)

            responseData = {
                "type": 'comments',
                "items": item_list
            }

            return Response(responseData, status=200)
        except:
            for comment in comments:
                serializer = CommentSerializer(comment)
                data = serializer.data
                author = Authors.objects.get(username=data['author'])
                serializeAuthor = AuthorSerializer(author)
                author_data = serializeAuthor.data
                author_data['displayName'] = author_data.pop('displayName')
                comment_data = {**data, 'author': author_data}
                item_list.append(comment_data)

            responseData = {
                "type": 'comments',
                "items": item_list
            }

            return Response(responseData, status=200)

    elif request.method == 'POST':
        currentAuthor = Authors.objects.filter(uuid=pk).first()
        currentPost = Posts.objects.filter(uuid=postsId).first()
        new_comment = request.data
        new_COMM_UUId = uuid.uuid4()
        commentId = f"{request.build_absolute_uri('/')}server/authors/{str(pk)}/posts/{str(postsId)}/comments/{str(new_COMM_UUId)}"
        newComment = Comments.objects.create(uuid=new_COMM_UUId, id=commentId, post=currentPost, author=currentAuthor,
                                             comment=new_comment['comment'], contentType=new_comment['contentType']
                                             )
        newComment.save()
        return Response(status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def getOneComment(request, pk, postsId, commentId):
    if request.method == "GET":
        comment = Comments.objects.get(uuid=commentId)
        serializeComment = CommentSerializer(comment).data

        author = Authors.objects.get(username=serializeComment['author'])
        serializeAuthor = AuthorSerializer(author).data
        serializeAuthor['displayName'] = serializeAuthor.pop('displayName')

        serializeComment['author'] = serializeAuthor

        responseData = {
            "type": "comment",
            "items": [serializeComment]
        }

        return Response(responseData, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def getFollowers(request, pk):
    """
    Display a list of followers that follow user<pk>
    """
    if request.method == 'GET':
        oneFollowers = Followers.objects.filter(followedUser__uuid=pk)

        followerList = [AuthorSerializer(followers.follower).data for followers in oneFollowers]

        data = {
            "type": "followed user",
            "followersNum": len(followerList),
            "items": followerList,
        }

        return Response(data, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def getFollowing(request, pk):
    """
    Display a list of followers that followed by user<pk>
    """
    if request.method == 'GET':
        oneFollowers = Followers.objects.filter(follower__uuid=pk)

        followerList = [AuthorSerializer(followers.followedUser).data for followers in oneFollowers]

        data = {
            "type": "followed by user",
            "followedNum": len(followerList),
            "items": followerList,
        }

        return Response(data, status=200)

@api_view(['DELETE', 'PUT', 'GET'])
@permission_classes([AllowAny])
def oneFollower(request, pk, foreignPk):
    """
    DELETE: delete the author<foreignPk> from author<pk>'s follower list<br>
    PUT: add a new author<foreignPk> to the author<pk>'s follower list<br>
    GET: if author<foreignPk> followed author<pk>, author details will be displayed
    """
    try:
        current_user = Authors.objects.get(uuid=pk)
        foreign_user = Authors.objects.get(uuid=foreignPk)
    except Authors.DoesNotExist:
        return Response({"message": "User not found"}, status=404)

    if request.method == 'DELETE':
        try:
            Followers.objects.get(follower=current_user, followedUser=foreign_user).delete()
            return Response({"message": "Unfollowed successfully"}, status=200)
        except Followers.DoesNotExist:
            return Response({"message": "No such follower relationship"}, status=404)

    elif request.method == 'PUT':
        if Followers.objects.filter(follower=current_user, followedUser=foreign_user):
            return Response({"message": "Already followed"}, status=400)
        else:
            if current_user == foreign_user:
                return Response({"message": "You cannot follow yourself"}, status=400)
            new_follow = Followers(followedUser=foreign_user, follower=current_user)
            new_follow.save()
            return Response({"message": "Followed successfully"}, status=200)

    elif request.method == 'GET':
        if Followers.objects.filter(follower=current_user, followedUser=foreign_user):
            data = {
                "isFollowed": True,
                "author": AuthorSerializer(foreign_user).data,
                "followed by": AuthorSerializer(current_user).data
            }
            return Response(data, status=200)
        else:
            return Response({"isFollowed": False}, status=404)


#don't use this GET method, use getFollowers instead
@api_view(['GET','POST'])
@permission_classes([AllowAny])
def followRequest(request, pk, foreignPk):
    try:
        current_user = Authors.objects.get(uuid=pk)
        foreign_user = Authors.objects.get(uuid=foreignPk)
    except Authors.DoesNotExist:
        return Response({"message": "User not found"}, status=404)

    if current_user == foreign_user:
        return Response({"message": "You cannot follow yourself"}, status=404)
        
    author_name = current_user.displayName
    object_name = foreign_user.displayName
    belongTo = foreign_user.uuid
    summary = author_name + " wants to follow " + object_name
    
    if request.method == 'POST':
        if not Followers.objects.filter(follower=current_user, followedUser=foreign_user):
            makeRequest = FollowRequests.objects.create(actor=current_user, object=foreign_user, belongTo=belongTo, summary=summary)
            makeRequest.save()

            send_author_inbox = Inbox.objects.get(author=object_user)
            send_author_inbox.followRequests.add(makeRequest)

            responseData = {
                "type": "creat followRequest" 
            }
            return Response(responseData, status=201)
        else:
                return Response({"message": "You are already following this user"}, status=404)
    else:
        responseData = {
            "type": "creat comment",
            "items": '[]'
        }
        return Response(responseData, status=200)


######################################################
@api_view(['GET'])
@permission_classes([AllowAny])
def get_post_likes(request, pk, postsId):
    """
    Get a list of likes of a post
    """
    if request.method == "GET":
        try:
            post = Posts.objects.get(uuid=postsId)
            likes = Likes.objects.filter(object=post.id)
        except Posts.DoesNotExist:
            return Response({"detail":"Post not found"},status=404)

        items_list = []
        for like in likes:
            author = Authors.objects.get(uuid=like.author.uuid)
            author_dict = AuthorSerializer(author).data
            author_dict.pop("username")
            author_dict.pop("password")
            like_dict = LikedSerializer(like).data
            like_dict["author"] = author_dict
            items_list.append(like_dict)

        response_data = {
            "type": "likes",
            "total_likes": len(items_list),
            "items": items_list,
            
        }

        return Response(response_data, status=200)

#########################################################
@api_view(['GET'])
@permission_classes([AllowAny])
def get_liked(request, pk):
    """
    Get a list of posts liked by an author
    """
    if request.method == "GET":
        author = Authors.objects.get(uuid=pk)
        likes = Likes.objects.filter(author=author)
        
        items_list = []
        for like in likes:
            try:
                post = Posts.objects.get(id=like.object)
                
                post_dict = PostsSerializer(post).data
                
                items_list.append(post_dict)
            except Exception as e:
                print(e)
                continue
        response_data = {
            "type": "liked",
            "total_liked": len(items_list),
            "items": items_list,
        }

        return Response(response_data, status=200)

#########################################################
@api_view(['GET'])
@permission_classes([AllowAny])
def get_liked_comments(request, pk):
    """
    Get a list of comments liked by an author
    """
    if request.method == "GET":
        author = Authors.objects.get(uuid=pk)
        likes = Likes.objects.filter(author=author)
        
        items_list = []
        for like in likes:
            try:
                comment = Comments.objects.get(id=like.object)
                
                comment_dict = CommentSerializer(comment).data
                
                items_list.append(comment_dict)
            except Exception as e:
                print(e)
                continue
        response_data = {
            "type": "liked",
            "total_liked": len(items_list),
            "items": items_list,
        }

        return Response(response_data, status=200)

######################################################
@api_view(['GET'])
@permission_classes([AllowAny])
def get_comment_likes(request, pk, commentId):
    """
    Get a list of likes of a comment
    """
    if request.method == "GET":
        try:
            comment = Comments.objects.get(uuid=commentId)
            likes = Likes.objects.filter(object=comment.id)
        except Comments.DoesNotExist:
            return Response({"detail": "Comment not found."}, status=404)

        likes_list = []
        for like in likes:
            author = Authors.objects.get(uuid=like.author.uuid)
            author_dict = AuthorSerializer(author).data
            author_dict.pop("username")
            author_dict.pop("password")
            like_dict = LikedSerializer(like).data
            like_dict["author"] = author_dict
            likes_list.append(like_dict)

        response_data = {
            "type": "likes",
            "total_likes": len(likes_list),
            "items": likes_list,
        }

        return Response(response_data, status=200)
'''
@api_view(['GET', 'DELETE', 'POST'])
@permission_classes([AllowAny])
def get_inbox(request, pk):
    if request.method != 'GET':
        return Response(status=405)

    try:
        inbox = Inbox.objects.select_related('author').get(author__uuid=pk)
        author = Authors.objects.get(uuid=pk)
    except (Inbox.DoesNotExist, Authors.DoesNotExist):
        return Response(status=404)

    post_list = []
    for post in 1.all():
        post_dict = PostsSerializer(post).data
        post_dict['author'] = AuthorSerializer(post.author).data
        post_dict['categories'] = post.categories
        post_dict['count'] = post.pop('count')
        post_dict.pop('categories')
        post_list.append(post_dict)

    comment_list = []
    for comment in inbox.comments.all():
        comment_dict = CommentSerializer(comment).data
        author = Authors.objects.get(username=comment_dict['author'])
        comment_dict['author'] = AuthorSerializer(author).data
        comment_list.append(comment_dict)

    follow_request_list = []
    for request in inbox.followRequests.all():
        request_dict = {"type": "Follow"}
        request_dict.update(FollowRequestSerializer(request).data)
        request_dict['summary'] = request_dict.pop('summary')
        request_dict['actor'] = AuthorSerializer(Authors.objects.get(username=request_dict['actor'])).data
        request_dict['object'] = AuthorSerializer(Authors.objects.get(username=request_dict['object'])).data
        follow_request_list.append(request_dict)

    liked_list = []
    for like in inbox.likes.all():
        liked_dict = {"@context": "https://eclass.srv.ualberta.ca/portal/"}
        liked_dict.update(LikedSerializer(like).data)
        liked_dict['author'] = AuthorSerializer(author).data
        liked_list.append(liked_dict)

    response_data = {
        "type": "inbox",
        "author": author.id,
        "items": post_list + comment_list + follow_request_list + liked_list,
    }

    return Response(response_data, status=200)
    '''
    
@api_view(['GET', 'DELETE', 'POST'])
@permission_classes([AllowAny])
def inbox(request, pk):
    if request.method == 'GET':
        try:
            author = Authors.objects.get(uuid=pk)
            author_inbox = Inbox.objects.get(author=author)
            #print(author_inbox.comments.all())
        
        
            posts_list = [ShareSerializer(post).data for post in author_inbox.posts.all()]
            for i in posts_list:
                user = Authors.objects.get(username=i['author'])
                i['author'] = AuthorSerializer(user).data
                temp_post = Posts.objects.get(id=i['post'])
                i['post'] = PostsSerializer(temp_post).data
            comments_list = [CommentSerializer(comment).data for comment in author_inbox.comments.all()]
            for i in comments_list:
                user = Authors.objects.get(username=i['author'])
                i['author'] = AuthorSerializer(user).data
            follow_requests_list = [FollowRequestSerializer(request).data for request in author_inbox.followRequests.all()]
            for i in follow_requests_list:
                user_a = Authors.objects.get(username=i['actor'])
                user_b = Authors.objects.get(username=i['object'])
                i['actor'] = AuthorSerializer(user_a).data
                i['object'] = AuthorSerializer(user_b).data

            likes_list = [LikedSerializer(like).data for like in author_inbox.likes.all()]
            for i in likes_list:
                user = Authors.objects.get(username=i['author'])
                i['author'] = AuthorSerializer(user).data

            data_list = []
            data_list.append(posts_list)
            data_list.append(comments_list)
            data_list.append(follow_requests_list)
            data_list.append(likes_list)
            #posts_list + comments_list + follow_requests_list + likes_list

            response_data = {
                "type": "inbox",
                "author": author.uuid,
                "items": data_list,
            }

            return Response(response_data, status=200)
        except :
            return Response(status=404)
    elif request.method == 'POST':


        try:
            author = Authors.objects.get(uuid=pk)
            inbox = Inbox.objects.get(author=author)
        except (Authors.DoesNotExist, Inbox.DoesNotExist):
            return Response(status=404)

        post_type = request.data.get('type')

        if post_type == 'post':
        #     title = request.data.get('title')
        #     #return Response(f"{title}", status=400)
        #     if "description" in request.data:
        #         description = request.data.get('description')
        #     else:
        #         description = ""
        #     if "content" in request.data:
        #         content = request.data.get('content')
        #     else:
        #         content = ""
        #     if "visibility" in request.data:
        #         visibility = request.data.get('visibility')
        #     else:
        #         visibility = "PUBLIC"
        #     if "contentType" in request.data:
        #         content_type = request.data.get('content_type')
        #     else:
        #         content_type = "text/plain"
        #     if "categories" in request.data:
        #         categories = request.data.get('categories')
        #     else:
        #         categories = ""
        #     uid = str(uuid.uuid4())

        #     tempCheck = 0
        #     if 'image' in request.FILES:
        #         image = request.FILES['image']
        #         image_path = default_storage.save(f'uploads/{pk}/{image.name}', image)
        #         contentImage = f"{request.build_absolute_uri('/')[:-1]}/{image_path}"
        #         content_type = 'image'  
        #         tempCheck = 1

        #     new_post = Posts()
        #     new_post.title = title
        #     new_post.description = description
        #     if tempCheck == 1:
        #         new_post.contentImage = contentImage
        #     else:
        #         new_post.content = content
        #     new_post.visibility = visibility
        #     new_post.contentType = content_type
        #     new_post.uuid = uid
        #     new_post.id = f"{request.build_absolute_uri('/')[:-1]}/authors/{pk}/posts/{uid}"
        #     new_post.source = new_post.id
        #     new_post.origin = new_post.id
        #     current_author = Authors.objects.get(uuid=pk)
        #     new_post.author = current_author
        #     new_post.categories = categories
        #     new_post.count = "0"
        #     new_post.save()
            postId = request.data.get('postId')
            sender = request.data.get('sender')
            sender_author = Authors.objects.get(uuid=sender)
            selectedPost = Posts.objects.get(uuid=postId)
            sendToAuthor = Authors.objects.get(uuid=pk)

            newShare = Shares.objects.create(post=selectedPost, author=sender_author)
            newShare.save()

            inbox = Inbox.objects.get(author=sendToAuthor)
            inbox.posts.add(newShare)
            inbox.save()

        elif post_type == 'follow':

            try:
                follower_user = request.data.get('follower')
                current_user = Authors.objects.get(uuid=follower_user)
                foreign_user = Authors.objects.get(uuid=pk)
            except Authors.DoesNotExist:
                return Response({"message": "User not found"}, status=404)

            if current_user == foreign_user:
                return Response({"message": "You cannot follow yourself"}, status=404)
                
            author_name = current_user.displayName
            object_name = foreign_user.displayName
            belongTo = foreign_user.uuid
            summary = author_name + " wants to follow " + object_name
            
            if not Followers.objects.filter(follower=current_user, followedUser=foreign_user):
                makeRequest = FollowRequests.objects.create(actor=current_user, object=foreign_user, belongTo=belongTo, summary=summary)
                makeRequest.save()
                inbox.followRequests.add(makeRequest)
                inbox.save()
            else:
                return Response({"message": "You are already following this user"}, status=404)

        elif post_type == 'like': 
            try:
                p_or_c = request.data.get('p_or_c')#get post or comment
                userId = request.data.get('userId')
                currentAuthor = Authors.objects.get(uuid=userId)
                author_name = currentAuthor.displayName
                
                if p_or_c == "post":
                    postId = request.data.get('postId')
                    post = Posts.objects.get(uuid=postId).id
                elif p_or_c == "comment":
                    commentId = request.data.get('commentId')
                    post = Comments.objects.get(uuid=commentId).id
                
                summary = author_name + " liked your "+p_or_c
            except:
                return Response({"message": "Post not found"}, status=404)


            if not Likes.objects.filter(author=currentAuthor, summary=summary, object=post):
                like = Likes.objects.create(author=currentAuthor, summary=summary, object=post)
                like.save()
                if not Liked.objects.filter(object=post):
                    receiver_liked = Liked.objects.create(object=post)
                liked = Liked.objects.get(object=post)
                liked.items.add(like)

                inbox.likes.add(like)
                inbox.save()
            else:
                return Response({"message": "You have already liked this post"}, status=404)


        elif post_type == 'comment':
            comment = request.data.get('comment')
            postId = request.data.get('postId')
            userId = request.data.get('userId')
            content_type = request.data.get('content_type', 'text/plain')
            uid = str(uuid.uuid4())

            newComment = Comments()
            newComment.comment = comment
            newComment.contentType = content_type
            newComment.uuid = uid
            newComment.id = f"{request.build_absolute_uri('/')[:-1]}/server/authors/{str(userId)}/posts/{str(postId)}/comments/{uid}"
            
            currentAuthor = Authors.objects.get(uuid=userId)
            newComment.author = currentAuthor

            currentPost = Posts.objects.get(uuid=postId)
            newComment.post = currentPost
            newComment.save()

            # Increment the post count and save the post
            currentPost.count = str(int(currentPost.count) + 1)
            currentPost.save()

            inbox.comments.add(newComment)
            inbox.save()

        else:
            return Response(status=400)

        inbox.save()
        return Response(status=201)

    elif request.method == 'DELETE':
        try:
            author = Authors.objects.get(uuid=pk)
            inbox = Inbox.objects.get(author=author)
        except (Authors.DoesNotExist, Inbox.DoesNotExist):
            return Response(status=404)

        inbox.posts.clear()
        inbox.comments.clear()
        inbox.followRequests.clear()
        inbox.likes.clear()

        return Response(status=204)

    else:
        return Response(status=405)
