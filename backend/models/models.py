from django.db import models
from django.contrib.auth.models import AbstractBaseUser
#from django.core.validators import MinLengthValidator
import uuid
import os

class Authors(AbstractBaseUser):
    class Meta:
        verbose_name_plural = 'Authors'

    username = models.CharField(max_length = 255, unique = True, primary_key=True, default="", blank=False)
    password = models.CharField(max_length = 255, default="", blank=False)
    type = models.CharField(default="author",editable=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    id = models.CharField(unique=True, max_length=255, blank=True, null=True)
    url = models.CharField(max_length = 255, null=True, blank=True, default="")
    host = models.CharField(max_length = 255, null=True, blank=True, default="")
    displayName = models.CharField(max_length = 20, null=True, blank=True, default="")
    github = models.CharField(max_length = 255, null=True, blank=True, default="")
    profileImage = models.ImageField(upload_to='profile_images', blank=True, null=True)
    accepted = models.BooleanField(default = False)

    def __str__(self):
        return "username"+self.username + "uuid"+str(self.uuid)

class Posts(models.Model):
    class Meta:
        verbose_name_plural = 'Posts'

    PLAINTEXT = 'text/plain'
    MARKDOWN = 'text/markdown'
    IMAGE = 'image'
    PUBLIC = 'PUBLIC'
    FRIENDS = 'FRIENDS'
    UNLISTED = 'UNLISTED'
    content_type_choices = [
        (PLAINTEXT, 'PLAINTEXT'),
        (MARKDOWN, 'COMMONMARK'),
        (IMAGE, 'IMAGE')
    ]
    visibility_choices = [
        (PUBLIC, 'PUBLIC'),
        (FRIENDS, 'FRIENDS'),
        (UNLISTED, 'UNLISTED')
    ]
    id = models.CharField(max_length = 255, primary_key = True)
    type = models.CharField(max_length = 255, default = "post")
    title = models.CharField(max_length = 255)
    source = models.CharField(max_length = 255)
    origin = models.CharField(max_length = 255)
    description = models.CharField(max_length = 255)
    contentType = models.CharField(max_length = 15, choices = content_type_choices, default = PLAINTEXT)
    content = models.TextField()
    originalAuthor = models.ForeignKey(Authors, on_delete = models.DO_NOTHING, related_name = "originalPoster")
    author = models.ForeignKey(Authors, on_delete= models.CASCADE, related_name = "poster")
    count = models.IntegerField(default = 0)
    published = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(max_length = 8, choices = visibility_choices, default = PUBLIC)


class Followers(models.Model):
    class Meta:
        verbose_name_plural = 'Followers'
    
    followedId = models.CharField(max_length = 255, primary_key = True)#store uuid of author being followed
    type = models.CharField(default="followers",editable=False)
    followedUser = models.ForeignKey(Authors, on_delete= models.CASCADE)
    follower = models.ForeignKey(Authors, on_delete= models.CASCADE)


class FollowRequests(models.Model):
    class Meta:
        verbose_name_plural = 'FollowRequests'
        
    belongTo = models.CharField(max_length = 255, primary_key = True)#store uuid of the author who received the request
    type = models.CharField(default="Follow",editable=False)
    summary = models.TextField(max_length=25, blank=True,default='')
    actor = models.ForeignKey(Authors, on_delete= models.CASCADE)
    object = models.ForeignKey(Authors, on_delete= models.CASCADE)


class Comments(models.Model):
    class Meta:
        verbose_name_plural = 'Comments'
        
    PLAINTEXT = 'text/plain'
    MARKDOWN = 'text/markdown'
    choices = [
        (PLAINTEXT, 'PLAINTEXT'),
        (MARKDOWN, 'MARKDOWN')
    ]
    id = models.CharField(max_length=255, primary_key = True)
    type = models.CharField(max_length=16, default = "comment")
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    post = models.ForeignKey(Posts, on_delete = models.CASCADE)
    comment = models.CharField(max_length=255)
    contentType = models.CharField(
        max_length = 15,
        choices = choices,
        default = PLAINTEXT
    )
    published = models.DateTimeField(auto_now_add = True)

class Likes(models.Model):
    class Meta:
        verbose_name_plural = 'Likes'
        
    id = models.CharField(max_length=255, primary_key = True)
    context = models.CharField(max_length=255)
    summary = models.CharField(max_length=64)
    type = models.CharField(max_length=16, default = "like")
    published = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    post = models.ForeignKey(Posts, on_delete = models.CASCADE)

class LikesComments(models.Model):
    class Meta:
        verbose_name_plural = 'LikesComments'
        
    id = models.CharField(max_length=255, primary_key = True)
    context = models.CharField(max_length=255)
    summary = models.CharField(max_length=64)
    type = models.CharField(max_length=16, default = "likescomment")
    published = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    comment = models.ForeignKey(Comments, on_delete = models.CASCADE)

class Inbox(models.Model):
    class Meta:
        verbose_name_plural = 'Inboxes'
        
    id = models.CharField(max_length=255, primary_key = True)
    author = models.ForeignKey(Authors, on_delete = models.CASCADE)
    post = models.ForeignKey(Posts, on_delete = models.CASCADE)

class Images(models.Model):

    # Copied from https://stackoverflow.com/questions/15140942/django-imagefield-change-file-name-on-upload
    def change_name(instance, filename):
        upload_to = 'images'
        ext = filename.split('.')[-1]
        # get filename
        if instance.pk:
            filename = '{}.{}'.format(instance.pk, ext)
        else:
            # set filename as random string
            filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(upload_to, filename)

    id = models.CharField(max_length=255, primary_key=True)
    imageContent = models.TextField()
    referenceId = models.CharField(max_length=255, unique=True)