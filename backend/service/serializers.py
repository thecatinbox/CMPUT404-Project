from rest_framework import serializers
from allModels.models import Authors, FollowRequests, Posts, Comments, Likes


class AuthorSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default='author', max_length=10)

    class Meta:
        model = Authors
        fields = ('type', 'uuid', 'id', 'url', 'host', 'github', 'profileImage', 'username', 'password', 'displayName')


class PostsSerializer(serializers.ModelSerializer):
    type = serializers.CharField(max_length=10, default='posts')

    class Meta:
        model = Posts
        fields = ('uuid', 'type', 'title', 'id', 'source', 'description', 'contentType',
                  'content', 'author', 'Categories', 'count', 'origin', 'published', 'visibility')


class ImagePostsSerializer(serializers.ModelSerializer):
    post_image = serializers.ImageField()

    class Meta:
        model = Posts
        fields = ('post_image',)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('uuid', 'type', 'author', 'comment', 'contentType', 'published', 'id')



class LikedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('type', 'summary', 'author', 'object')


class FollowRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowRequests
        fields = '__all__'