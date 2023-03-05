from django.shortcuts import render
from django.http import HttpResponseRedirect, FileResponse, Http404, HttpResponseBadRequest
from django.urls import reverse
from rest_framework.response import Response
from rest_framework import permissions, authentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import AuthorSerializer, PostsSerializer, LikedSerializer, CommentSerializer, FollowRequestSerializer
from allModels.models import Authors, Followers, FollowRequests
from allModels.models import Posts, Comments, Likes, Liked
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
        page (int): The current page number (default is 1).
        page_size (int): The number of items per page (default is 10).

    Returns:
        A tuple containing:
        - The paginated objects.
        - The total number of pages.
        - The current page number.
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
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
@permission_classes([AllowAny])
def authorsList(request):
    """
    This view is used to display all authors information
    """
    authors = Authors.objects.all()

    # Get page and size from query parameters
    page = int(request.query_params.get('page', 1))
    page_size = int(request.query_params.get('size', 10))

    paginated_authors, total_pages, current_page = paginate(authors, page, page_size)

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
        dict.pop('username')

        itemsList.append(dict)

    responseData = {
        "type": "authors",
        "items": itemsList,
        "totalPages": total_pages,
        "currentPage": current_page
    }

    return Response(responseData, status=200)


"""
Single Author
"""


@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
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
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
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
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
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
            

            if not posts.exists():
                return Response(status=404)

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
        id = f"{request.build_absolute_uri('/')}service/authors/{str(pk)}/posts/{str(new_postId)}"
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


@api_view(['GET', 'DELETE', 'POST', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
@permission_classes([AllowAny])
def get_post(request, pk, postsId):
    """
    Get, update, delete or create a specific post.
    """
    # Get a specific post
    if request.method == 'GET':
        post = Posts.objects.filter(uuid=postsId).first()
        if not post:
            return Response(status=404)

        post_dict = {
            'title': post.title,
            'id': post.id,
            'source': post.source,
            'description': post.description,
            'contentType': post.contentType,
            'content': post.content,
            'origin': post.origin,
            'published': post.published,
            'visibility': post.visibility,
            'categories': post.categories,
            'author': {
                'id': post.author.uuid,
                'displayName': post.author.username,
                'github': post.author.github,
                'bio': post.author.bio,
                'host': post.author.host,
                'url': post.author.url,
            },
            'count': post.count,
        }
        return Response(post_dict)

    # Update an existing post
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response(status=401)

        post = Posts.objects.filter(author__uuid=pk, uuid=postsId).first()
        if not post:
            return Response(status=404)

        post.title = request.data.get('title', post.title)
        post.source = request.data.get('source', post.source)
        post.description = request.data.get('description', post.description)
        post.contentType = request.data.get('contentType', post.contentType)
        post.content = request.data.get('content', post.content)
        post.origin = request.data.get('origin', post.origin)
        post.published = request.data.get('published', post.published)
        post.visibility = request.data.get('visibility', post.visibility)
        post.categories = request.data.get('categories', post.categories)
        post.save()

        return Response(status=200)

    # Delete a post
    elif request.method == 'DELETE':
        if not request.user.is_authenticated:
            return Response(status=401)

        post = Posts.objects.filter(author__uuid=pk, uuid=postsId).first()
        if not post:
            return Response(status=404)

        post.delete()
        return Response(status=204)

    # Create a new post
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return Response(status=401)

        current_author = Authors.objects.filter(uuid=pk).first()
        if not current_author:
            return Response(status=404)

        new_post_id = uuid.uuid4()
        new_post = Posts.objects.create(
            title=request.data.get('title'),
            uuid=new_post_id,
            id=f"{request.build_absolute_uri('/')}/service/authors/{pk}/posts/{new_post_id}",
            source=request.data.get('source'),
            origin=request.data.get('origin'),
            description=request.data.get('description'),
            contentType=request.data.get('contentType'),
            content=request.data.get('content'),
            author=current_author,
            categories=request.data.get('categories'),
            visibility=request.data.get('visibility', 'PUBLIC'),
        )
        new_post.save()

        return Response(status=201)


"""
Image Posts
"""


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
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
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
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
        commentId = f"{request.build_absolute_uri('/')}service/authors/{str(pk)}/posts/{str(postsId)}/comments/{str(new_COMM_UUId)}"
        newComment = Comments.objects.create(uuid=new_COMM_UUId, id=commentId, post=currentPost, author=currentAuthor,
                                             comment=new_comment['comment'], contentType=new_comment['contentType']
                                             )
        newComment.save()
        return Response(status=200)


@api_view(['GET'])
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
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
@permission_classes([AllowAny])
def getFollowers(request, pk):
    """
    Display a list of followers that followed by user<pk>
    """
    if request.method == 'GET':
        oneFollowers = Followers.objects.filter(follower__uuid=pk)

        followerList = [AuthorSerializer(followers.author).data for followers in oneFollowers]

        data = {
            "type": "followers",
            "items": followerList,
        }

        return Response(data, status=200)


@api_view(['DELETE', 'PUT', 'GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
@permission_classes([AllowAny])
def oneFollower(request, pk, foreignPk):
    """
    Execute<br>
    DELETE: delete the author<foreignPk> from author<pk>'s follower list<br>
    PUT: add a new author<foreignPk> to the author<pk>'s follower list<br>
    GET: if author<foreignPk> followed author<pk>, author details will be displayed
    """

    if request.method == 'DELETE':
        Followers.objects.filter(follower__uuid=pk, author__uuid=foreignPk).delete()
        return Response(status=200)

    elif request.method == 'PUT':
        """
        Followers author ---follows----> follower
                  author is a follower of follower
        add foreignPk --> follower.author
        add pk --> follower.follower
        """
        currentUserName = Authors.objects.get(uuid=foreignPk).username

        if request.user.is_authenticated:
            followedBy = Authors.objects.get(uuid=foreignPk)
            followTo = Authors.objects.get(uuid=pk)
            newFollow = Followers(author=followedBy, follower=followTo)
            newFollow.save()
            return Response(status=200)

        else:
            return HttpResponseRedirect(reverse("login"), status=303)


    elif request.method == 'GET':
        try:
            selectedFollower = Authors.objects.get(uuid=foreignPk, followers__follower__uuid=pk)
            data = {
                "isFollowed": True,
                "author": AuthorSerializer(selectedFollower).data
            }
            return Response(data, status=200)

        except Authors.DoesNotExist:
            return Response({"isFollowed": False}, status=404)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
@permission_classes([AllowAny])
def get_post_likes(request, pk, postsId):
    """
    Get a list of likes of a post
    """
    if request.method == "GET":
        likes = Likes.objects.filter(object=postsId)

        items_list = []
        for like in likes:
            author = Authors.objects.get(uuid=like.author.uuid)
            author_dict = AuthorSerializer(author).data
            author_dict["displayName"] = author_dict.pop("displayName")
            like_dict = LikedSerializer(like).data
            like_dict["author"] = author_dict
            items_list.append(like_dict)

        response_data = {
            "type": "likes",
            "items": items_list,
        }

        return Response(response_data, status=200)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
@permission_classes([AllowAny])
def get_liked(request, pk):
    """
    Get a list of posts liked by an author
    """
    if request.method == "GET":
        likes = Likes.objects.filter(author__uuid=pk)

        items_list = []
        for like in likes:
            author_dict = AuthorSerializer(like.author).data
            author_dict["displayName"] = author_dict.pop("displayName")
            like_dict = LikedSerializer(like).data
            like_dict["author"] = author_dict
            items_list.append(like_dict)

        response_data = {
            "type": "liked",
            "items": items_list,
        }

        return Response(response_data, status=200)





@api_view(['GET', 'DELETE', 'POST'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.BasicAuthentication])
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
    for post in inbox.items.all():
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