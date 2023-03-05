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
        return f"username: {self.username} password: {self.password} type: {self.type} uuid: {self.uuid} id: {self.id} url: {self.url} host: {self.host} displayName: {self.displayName} github: {self.github} profileImage: {self.profileImage}"

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
    title = models.CharField(max_length = 255, default = "Untitled")
    id = models.CharField(max_length = 255, primary_key = True)#store url http://localhost:../authors/author_uuid/post/post_uuid
    source = models.CharField(max_length = 255, null=True, blank=True)
    origin = models.CharField(max_length = 255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    contentType = models.CharField(max_length = 15, choices = content_type_choices, default = ('text/plain', 'PLAINTEXT'))
    content = models.TextField(max_length=500, null=True, blank=True)
    contentImage = models.ImageField(upload_to='post_images', blank=True, null=True)
    author = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name = "poster")
    categories  = models.CharField(max_length = 255, null=True, blank=True)
    count = models.IntegerField(default = 0)
    published = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(max_length = 15, choices = visibility_choices, default = ('PUBLIC', 'PUBLIC'))

    def __str__(self):
        return f"uuid: {self.uuid} type: {type} title: {title} id: {id} source: {source} origin: {origin} description: {description} contentType: {contentType} content: {content} contentImage: {contentImage} author: {author} categories: {categories} count: {count} published: {published} visibility: {visibility}"

    

class Followers(models.Model):
    class Meta:
        verbose_name_plural = 'Followers'
    
    followedId = models.CharField(max_length = 255, primary_key = True)#store uuid of author being followed
    type = models.CharField(max_length = 255,default="followers",editable=False)
    followedUser = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name = "followedUser")
    follower = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name = "follower")

    def __str__(self):
         return f"followedId: {self.followedId} type: {self.type} followedUser: {self.followedUser} follower: {self.follower}"


class FollowRequests(models.Model):
    class Meta:
        verbose_name_plural = 'FollowRequests'
        
    belongTo = models.CharField(max_length = 255, primary_key = True)#store uuid of the author who received the request
    type = models.CharField(max_length = 255,default="Follow",editable=False)
    summary = models.TextField(max_length=25, blank=True,default='')
    actor = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name='request_sender')
    object = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name='request_receiver')

    def __str__(self):
        return f"belongTo{self.belongTo} type{type} summary{summary} actor{actor} object{object}"


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
        return f"uuid: {self.uuid} type: {type} author: {author} post: {post} comment: {comment} contentType: {contentType} published: {published} id: {id}"

class Likes(models.Model):
    class Meta:
        verbose_name_plural = 'Likes'

    context = models.CharField(max_length=255)    
    summary = models.CharField(max_length=64, default = "A user likes your post")
    type = models.CharField(max_length = 255,default = "like", editable = False) 
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    object = models.CharField(max_length=200,null = True, blank=True)#post id or comment id, url one

    def __str__(self):
        return f"MyClass(context={self.context} summary={self.summary} type={self.type} author={self.author} object={self.object})"

class Liked(models.Model): 
    class Meta:
        verbose_name_plural = 'Liked'

    type = models.CharField(max_length = 255,default='liked', editable=False)
    items = models.ManyToManyField(Likes,blank=True)
    object = models.CharField(max_length=200,null = True, blank=True)#post id or comment id, url one

    def __str__(self):
        return f"type{self.type} items{self.items} object{self.object}"

class Inbox(models.Model):
    class Meta:
        verbose_name_plural = 'Inboxes'
    
    type = models.CharField(max_length = 255,default = "inbox", editable = False)
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    items = models.ManyToManyField(Posts, blank=True)
    comments = models.ManyToManyField(Comments, blank=True, symmetrical=False)
    followRequests = models.ManyToManyField(FollowRequests, blank=True, symmetrical=False)
    likes = models.ManyToManyField(Liked, blank=True, symmetrical=False)

    def __str__(self):
        return f"type{type} author{author} items{items} comments{comments} followRequests{followRequests} likes{likes}"
