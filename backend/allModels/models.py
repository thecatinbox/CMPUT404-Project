from django.db import models
from django.contrib.auth.models import AbstractBaseUser
#from django.core.validators import MinLengthValidator
import uuid
import os

class Authors(models.Model):
    class Meta:
        verbose_name_plural = 'Authors'

    username = models.CharField(max_length = 255, unique = True, primary_key=True, default="")
    password = models.CharField(max_length = 255, default="", blank=False)
    type = models.CharField(max_length = 255,default="author",editable=False)
    #remeber to change editable back to false！！！！！！！！！！！！！！！！！
    uuid = models.CharField(max_length = 255, editable=True, unique=True)
    id = models.CharField(unique=True, max_length=255, blank=True, null=True)
    url = models.CharField(max_length = 255, null=True, blank=True, default="")
    host = models.CharField(max_length = 255, null=True, blank=True, default="")
    displayName = models.CharField(max_length = 255, null=True, blank=True, default="")
    github = models.CharField(max_length = 255, null=True, blank=True, default="")
    profileImage = models.ImageField(upload_to='profile_images', blank=True, null=True)
    #accepted = models.BooleanField(default = False)

    def __str__(self):
        return f"username:{self.username} password:{self.password} type: {self.type} uuid: {self.uuid} id: {self.id} url: {self.url} host: {self.host} displayName: {self.displayName} github: {self.github} profileImage: {self.profileImage}"

class Posts(models.Model):
    class Meta:
        verbose_name_plural = 'Posts'

    content_type_choices = [
        ('text/plain', 'PLAINTEXT'),
        ('text/markdown', 'COMMONMARK'),
        ('image', 'IMAGE')
    ]
    visibility_choices = [
        ('PUBLIC', 'PUBLIC'),
        ('FRIENDS', 'FRIENDS'),
        ('PRIVATE', 'PRIVATE')
    ]
    uuid = models.CharField(max_length = 255,default=str(uuid.uuid4()), editable=True, unique=True)
    type = models.CharField(max_length = 255, default = "post", editable = False)
    title = models.CharField(max_length = 255, default = "Untitled",editable=True)
    id = models.CharField(max_length = 255, primary_key = True)#store url http://localhost:../authors/author_uuid/post/post_uuid
    source = models.CharField(max_length = 255, null=True, blank=True,editable=True)
    origin = models.CharField(max_length = 255, null=True, blank=True)
    description = models.TextField(null=True, blank=True,editable=True)
    contentType = models.CharField(max_length = 15, choices = content_type_choices, default = ('text/plain', 'PLAINTEXT'),editable=True)
    content = models.TextField(max_length=500, null=True, blank=True,editable=True)
    contentImage = models.ImageField(upload_to='post_images', blank=True, null=True)
    author = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name = "poster")
    categories  = models.CharField(max_length = 255, null=True, blank=True,editable=True)
    count = models.IntegerField(default = 0)
    published = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(max_length = 15, choices = visibility_choices, default = ('PUBLIC', 'PUBLIC'),editable=True)

    def __str__(self):
        return f"uuid: {self.uuid} type: {self.type} title: {self.title} id: {self.id} source: {self.source} origin: {self.origin} description: {self.description} contentType: {self.contentType} content: {self.content} contentImage: {self.contentImage} author: {self.author} categories: {self.categories} count: {self.count} published: {self.published} visibility: {self.visibility}"

    

class Followers(models.Model):
    class Meta:
        verbose_name_plural = 'Followers'
        
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    followedId = models.CharField(max_length = 255, blank=True)#store uuid of author being followed
    type = models.CharField(max_length = 255,default="followers",editable=False)
    followedUser = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name = "followedUser")
    follower = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name = "follower")

    def __str__(self):
         return f"followedId: {self.followedId} type: {self.type} followedUser: {self.followedUser} follower: {self.follower}"


class FollowRequests(models.Model):
    class Meta:
        verbose_name_plural = 'FollowRequests'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    belongTo = models.CharField(max_length = 255, blank=True,default="")#store uuid of the author who received the request
    type = models.CharField(max_length = 255,default="Follow",editable=False)
    summary = models.TextField(max_length=255, blank=True,default='')
    actor = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name='request_sender')
    object = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name='request_receiver')

    def __str__(self):
        return f"belongTo: {self.belongTo} type: {self.type} summary: {self.summary} actor: {self.actor} object: {self.object}"


class Comments(models.Model):
    class Meta:
        verbose_name_plural = 'Comments'
        
    choices = [
        ('text/plain', 'PLAINTEXT'),
        ('text/markdown', 'MARKDOWN')
    ]
    uuid = models.CharField(max_length = 255,default=str(uuid.uuid4()), editable=True, unique=True)
    type = models.CharField(max_length = 255,default = "comment", editable = False)
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    post = models.ForeignKey(Posts, on_delete = models.CASCADE)
    comment = models.TextField(max_length=500, null=True, blank=True)
    contentType = models.CharField(max_length = 15, choices = choices, default = 'text/plain')
    published = models.DateTimeField(auto_now_add = True)
    id = models.CharField(max_length=255, primary_key = True)#store url http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid
    
    def __str__(self):
        return f"uuid: {self.uuid} type: {self.type} author: {self.author} post: {self.post} comment: {self.comment} contentType: {self.contentType} published: {self.published} id: {self.id}"

class Likes(models.Model):
    class Meta:
        verbose_name_plural = 'Likes'

    context = models.CharField(max_length=255)    
    summary = models.CharField(max_length=64, default = "A user likes your post")
    type = models.CharField(max_length = 255,default = "like", editable = False) 
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    object = models.CharField(max_length=200,null = True, blank=True)#post id or comment id, url one

    def __str__(self):
        return f"context:{self.context} summary:{self.summary} type:{self.type} author:{self.author} object:{self.object}"

class Liked(models.Model): 
    class Meta:
        verbose_name_plural = 'Liked'

    type = models.CharField(max_length = 255,default='liked', editable=False)
    items = models.ManyToManyField(Likes,blank=True)
    object = models.CharField(max_length=200,null = True, blank=True)#post id or comment id, url one

    def __str__(self):
        return (f"type:{self.type} "
                f"items:{', '.join(str(item) for item in self.items.all())}"
                f"object:{self.object} "
                )

class Shares(models.Model):
    class Meta:
        verbose_name_plural = 'Shares'

    type = models.CharField(max_length = 255,default='share', editable=False)
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)#author who shares
    post = models.ForeignKey(Posts, on_delete = models.CASCADE)

    def __str__(self):
        return (f"type:{self.type} "
                f"author:{self.author} "
                f"post:{self.post} "
                )    

class Inbox(models.Model):
    class Meta:
        verbose_name_plural = 'Inboxes'
    
    type = models.CharField(max_length = 255,default = "inbox", editable = False)
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    posts = models.ManyToManyField(Shares, blank=True, symmetrical=False)
    comments = models.ManyToManyField(Comments, blank=True, symmetrical=False)
    followRequests = models.ManyToManyField(FollowRequests, blank=True, symmetrical=False)
    likes = models.ManyToManyField(Likes, blank=True, symmetrical=False)

    # def __str__(self):
    #     return f"type:{self.type} author:{self.author} posts:{self.posts} comments:{self.comments} followRequests:{self.followRequests} likes:{self.likes}"
    def __str__(self):
        return (
            f"type:{self.type} "
            f"author:{self.author} "
            f"posts:{', '.join(str(post) for post in self.posts.all())} "
            f"comments:{', '.join(str(comment) for comment in self.comments.all())} "
            f"followRequests:{', '.join(str(request) for request in self.followRequests.all())} "
            f"likes:{', '.join(str(like) for like in self.likes.all())}"
        )