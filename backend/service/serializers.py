from rest_framework import serializers
from allModels.models import Authors, FollowRequests, Posts, Comments, Likes, Shares, Inbox


class AuthorSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default='author', max_length=10)

    class Meta:
        model = Authors
        fields = ('username','password','type', 'uuid', 'id', 'url', 'host', 'github', 'profileImage', 'displayName')


class PostsSerializer(serializers.ModelSerializer):
    type = serializers.CharField(max_length=10, default='posts')

    class Meta:
        model = Posts
        fields = ('uuid', 'type', 'title', 'id', 'source', 'description', 'contentType','contentImage',
                  'content', 'author', 'categories', 'count', 'origin', 'published', 'visibility')


class ImagePostsSerializer(serializers.ModelSerializer):
    post_image = serializers.ImageField()

    class Meta:
        model = Posts
        fields = ('contentImage',)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('uuid', 'type', 'author','post', 'comment', 'contentType', 'published', 'id')



class LikedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('context','type', 'summary', 'author', 'object')


class FollowRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowRequests
        fields = ('belongTo','type','summary','actor','object')

class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shares
        fields = ('type','author','post')