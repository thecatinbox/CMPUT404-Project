from django.test import TestCase
from .models import *
from django.db.utils import IntegrityError
import uuid
'''
Authors.objects.create(
    username="test_author_11111",
    password="test_password11111",
    uuid = uuid.uuid4(), 
    host="//service", 
    displayName="test_name_11111", 
    url="//service/author/11111", 
    github="http://github.com/test_author", 
    profileImage="url_to_profile_image"
)
'''
'''
class static():
    def users():

        user1 = Authors.objects.create(
            username="test_author_1",
            password="test_password",
            id=1, 
            host="//service", 
            displayName="test_author_11", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )
        
        user2 = Authors.objects.create(
            username="test_author_2",
            password="test_password",
            id=2, 
            host="//service", 
            displayName="test_author_22", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        user3 = Authors.objects.create(
            username="test_author_3",
            password="test_password",
            id=3, 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )

        return user1, user2, user3

    def posts():
        user1, user2, user3 = users()
        Posts.objects.create(
            title="test_post_1",
            id="http://localhost:../authors/author_uuid/post/post_uuid",
            source="http://localhost:../authors/author_uuid/post/post_uuid",
            origin="http://localhost:../authors/author_uuid/post/post_uuid",
            description="test_post_1",
            contentType="text/plain",
            content="test_post_1",
            author={username="test_author_11111",
    password="test_password11111",
    uuid = uuid.uuid4(), 
    host="//service", 
    displayName="test_name_11111", 
    url="//service/author/11111", 
    github="http://github.com/test_author", 
    profileImage="url_to_profile_image"},
            categories="test_post_1",
            count=0,
            published="2020-04-01T00:00:00Z",
            visibility="PUBLIC",
        )

        {
   "title":"test_post_1",
   "id":"http://localhost:../authors/author_uuid/post/post_uuid",
   "source":"http://localhost:../authors/author_uuid/post/post_uuid",
   "origin":"http://localhost:../authors/author_uuid/post/post_uuid",
   "description":"test_post_1",
   "contentType":"text/plain",
   "content":"test_post_1",
   "author":{
      "username":"test_author_11111",
      "password":"test_password11111",
      "uuid":"7dce957d-4ba2-4021-a76a-3ed8c4a06c97",
      "host":"//service",
      "displayName":"test_name_11111",
      "url":"//service/author/11111",
      "github":"http://github.com/test_author",
      "profileImage":"url_to_profile_image"
   },
   "categories":"test_post_1",
   "count":"0",
   "published":"2020-04-01T00:00:00Z",
   "visibility":"PUBLIC"
}

        Posts.objects.create(
            title="test_post_2",
            id="http://localhost:../authors/author_uuid/post/post_uuid",
            origin="http://localhost:../authors/author_uuid/post/post_uuid",
            description="test_post_2",
            contentType="text/markdown",
            content="test_post_2",
            author=user2,
            categories="test_post_2",
            count=5,
            published="2020-04-01T00:00:00Z",
            visibility="FRIENDS",
        )

        Posts.objects.create(
            title="test_post_3",
            id="http://localhost:../authors/author_uuid/post/post_uuid",
            source="http://localhost:../authors/author_uuid/post/post_uuid",
            origin="http://localhost:../authors/author_uuid/post/post_uuid",
            description="test_post_3",
            contentType="image",
            content="test_post_3",
            author=user3,
            count=100,
            published="2020-04-01T00:00:00Z",
            visibility="PRIVATE",
        )

        return post1, post2, post3

    def likes():
        user1,user2,user3 = users()
        post1,post2,post3 = posts()

        like1 = Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid1",
            summary="test1",
            author=user1,
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )

        like2 = Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid2",
            summary="test2",
            author=user2,
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )

        like3 = Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid3",
            author=user3,
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )

        return like1,like2,like3

    def comment():
        user1,user2,user3 = users()
        post1,post2,post3 = posts()

        comment1 = Comments.objects.create(
            author=user1,
            post=post1,
            comment="test1",
            contentType="text/markdown",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )

        comment2 = Comments.objects.create(
            author=user2,
            post=post2,
            comment="test2",
            contentType="text/plain",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )

        comment3 = Comments.objects.create(
            author=user3,
            post=post3,
            comment="test3",
            contentType="text/markdown",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )

        return comment1,comment2,comment3

    def followRequest():
        user1,user2,user3 = users()

        follow1 = FollowerRequests.objects.create(
            belongTo="gwghawegha",
            summary="test1",
            actor=user1,
            object=user2,
        )

        follow2 = FollowerRequests.objects.create(
            belongTo="gwgha123451235",
            summary="test2",
            actor=user2,
            object=user3,
        )

        follow3 = FollowerRequests.objects.create(
            belongTo="3462346agwegawg",
            summary="test3",
            actor=user3,
            object=user1,
        )

        return follow1,follow2,follow3

    def liked():
        like1,like2,like3 = likes()

        liked1 = Liked.objects.create(
            items=like1,
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )

        liked2 = Liked.objects.create(
            items=like2,
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )

        liked3 = Liked.objects.create(
            items=[like1,like2],
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )

        return liked1,liked2,liked3
'''
'''
Authors.objects.create(
    username="test_author_111",
    password="test_password",
    id=11, 
    host="//service", 
    displayName="test_author_11", 
    url="//service/author/1", 
    github="http://github.com/test_author", 
    profileImage="url_to_profile_image"
)

Authors.objects.create(
    username="test_author_222",
    password="test_password",
    id=22, 
    host="//service", 
    displayName="test_author_22", 
    url=f"//service/author/2", 
    profileImage="url_to_profile_image"
)

Authors.objects.create(
    username="test_author_333",
    password="test_password",
    id=33, 
    url=f"//service/author/3", 
    profileImage="url_to_profile_image"
)
'''

class AuthorTestCase(TestCase):
    
    def setUp(cls):
        print("test author model-----------------")
        
        Authors.objects.create(
            username="test_author_1",
            password="test_password",
            uuid = uuid.uuid4(),
            id="1", 
            host="//service", 
            displayName="test_author_1", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )
        
        Authors.objects.create(
            username="test_author_2",
            password="test_password",
            id="2", 
            host="//service", 
            displayName="test_author_2", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_3",
            password="test_password",
            id="3", 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )
        
    
    def testPostValues(self):
        user11 = Authors.objects.get(username="test_author_1")
        self.assertEqual(user11.username, "test_author_1")
        self.assertEqual(user11.password, "test_password")
        self.assertEqual(user11.id, "1")
        self.assertEqual(user11.host, "//service")
        self.assertEqual(user11.displayName, "test_author_1")
        self.assertEqual(user11.url, "//service/author/1")
        self.assertEqual(user11.github, "http://github.com/test_author")
        self.assertEqual(user11.profileImage, "url_to_profile_image")
        count1 = Authors.objects.filter(id=1).count()
        assert(count1 == 1)

        user22 = Authors.objects.get(username="test_author_2")
        self.assertEqual(user22.username, "test_author_2")
        self.assertEqual(user22.password, "test_password")
        self.assertEqual(user22.id, "2")
        self.assertEqual(user22.host, "//service")
        self.assertEqual(user22.displayName, "test_author_2")
        self.assertEqual(user22.url, "//service/author/2")
        self.assertEqual(user22.profileImage, "url_to_profile_image")
        count2 = Authors.objects.filter(id=2).count()
        assert(count2 == 1)
    '''
    def testNotExist(self):
        user3 = Authors.objects.filter(username="test_author_3")
        self.assertEqual(user3.host, '')
        self.assertEqual(user3.displayName, '')
    '''


class PostTestCase(TestCase):
    def setUp(cls):
        print("test post model-----------------")
        Authors.objects.create(
            username="test_author_111",
            password="test_password",
            id=11, 
            host="//service", 
            displayName="test_author_11", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_222",
            password="test_password",
            id=22, 
            host="//service", 
            displayName="test_author_22", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_333",
            password="test_password",
            id=33, 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )
        
        Posts.objects.create(
            title="test_post_1",
            id="http://localhost:../authors/author_uuid/post/post_uuid1",
            source="http://localhost:../authors/author_uuid/post/post_uuid1",
            origin="http://localhost:../authors/author_uuid/post/post_uuid1",
            description="test_post_1",
            contentType="text/plain",
            content="test_post_1",
            author=Authors.objects.get(id=11),
            categories="test_post_1",
            count=0,
            published="2020-04-01T00:00:00Z",
            visibility="PUBLIC",
        )

        Posts.objects.create(
            title="test_post_2",
            id="http://localhost:../authors/author_uuid/post/post_uuid2",
            origin="http://localhost:../authors/author_uuid/post/post_uuid2",
            description="test_post_2",
            contentType="text/markdown",
            content="test_post_2",
            author=Authors.objects.get(id=22),
            categories="test_post_2",
            count=5,
            published="2020-04-01T00:00:00Z",
            visibility="FRIENDS",
        )

        Posts.objects.create(
            title="test_post_3",
            id="http://localhost:../authors/author_uuid/post/post_uuid3",
            source="http://localhost:../authors/author_uuid/post/post_uuid3",
            origin="http://localhost:../authors/author_uuid/post/post_uuid3",
            description="test_post_3",
            contentType="image",
            content="test_post_3",
            author=Authors.objects.get(id=33),
            count=100,
            published="2020-04-01T00:00:00Z",
            visibility="PRIVATE",
        )

    def testPostValues(self):
        post1 = Posts.objects.get(title="test_post_1")
        self.assertEqual(post1.title, "test_post_1")
        self.assertEqual(post1.id, "http://localhost:../authors/author_uuid/post/post_uuid1")
        self.assertEqual(post1.source, "http://localhost:../authors/author_uuid/post/post_uuid1")
        self.assertEqual(post1.origin, "http://localhost:../authors/author_uuid/post/post_uuid1")
        self.assertEqual(post1.description, "test_post_1")
        self.assertEqual(post1.contentType, "text/plain")
        self.assertEqual(post1.content, "test_post_1")
        self.assertEqual(post1.author, Authors.objects.get(id=11))
        self.assertEqual(post1.categories, "test_post_1")
        self.assertEqual(post1.count, 0)
        self.assertEqual(post1.visibility, "PUBLIC")
        count1 = Posts.objects.filter(id="http://localhost:../authors/author_uuid/post/post_uuid1").count()
        assert(count1 == 1)

        post2 = Posts.objects.get(title="test_post_2")
        self.assertEqual(post2.title, "test_post_2")
        self.assertEqual(post2.id, "http://localhost:../authors/author_uuid/post/post_uuid2")
        self.assertEqual(post2.origin, "http://localhost:../authors/author_uuid/post/post_uuid2")
        self.assertEqual(post2.description, "test_post_2")
        self.assertEqual(post2.contentType, "text/markdown")
        self.assertEqual(post2.content, "test_post_2")
        self.assertEqual(post2.author, Authors.objects.get(id=22))
        self.assertEqual(post2.categories, "test_post_2")
        self.assertEqual(post2.count, 5)
        self.assertEqual(post2.visibility, "FRIENDS")
        count2 = Posts.objects.filter(id="http://localhost:../authors/author_uuid/post/post_uuid2").count()
        assert(count2 == 1)

        post3 = Posts.objects.get(title="test_post_3")
        self.assertEqual(post3.title, "test_post_3")
        self.assertEqual(post3.id, "http://localhost:../authors/author_uuid/post/post_uuid3")
        self.assertEqual(post3.source, "http://localhost:../authors/author_uuid/post/post_uuid3")
        self.assertEqual(post3.origin, "http://localhost:../authors/author_uuid/post/post_uuid3")
        self.assertEqual(post3.description, "test_post_3")
        self.assertEqual(post3.contentType, "image")
        self.assertEqual(post3.content, "test_post_3")
        self.assertEqual(post3.author, Authors.objects.get(id=33))
        self.assertEqual(post3.count, 100)
        self.assertEqual(post3.visibility, "PRIVATE")
        count3 = Posts.objects.filter(id="http://localhost:../authors/author_uuid/post/post_uuid3").count()
        assert(count3 == 1)


class FollowersTestCase(TestCase):
    def setUp(self):
        print("test followers model-----------------")
        Authors.objects.create(
            username="test_author_1",
            password="test_password",
            id=1, 
            host="//service", 
            displayName="test_author_11", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )
        
        Authors.objects.create(
            username="test_author_2",
            password="test_password",
            id=2, 
            host="//service", 
            displayName="test_author_22", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_3",
            password="test_password",
            id=3, 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )

        Followers.objects.create(
            followedId="gwghawegha",
            followedUser=Authors.objects.get(id=1),
            follower=Authors.objects.get(id=2),
        )

        Followers.objects.create(
            followedId="gwgha123451235",
            followedUser=Authors.objects.get(id=2),
            follower=Authors.objects.get(id=3),
        )

        Followers.objects.create(
            followedId="3462346agwegawg",
            followedUser=Authors.objects.get(id=3),
            follower=Authors.objects.get(id=1),
        )

    def testExist(self):
        follow1 = Followers.objects.get(followedId="gwghawegha")
        self.assertEqual(follow1.followedId, "gwghawegha")
        self.assertEqual(follow1.followedUser, Authors.objects.get(id=1))
        self.assertEqual(follow1.follower, Authors.objects.get(id=2))

        follow2 = Followers.objects.get(followedId="gwgha123451235")
        self.assertEqual(follow2.followedId, "gwgha123451235")
        self.assertEqual(follow2.followedUser, Authors.objects.get(id=2))
        self.assertEqual(follow2.follower, Authors.objects.get(id=3))

        follow3 = Followers.objects.get(followedId="3462346agwegawg")
        self.assertEqual(follow3.followedId, "3462346agwegawg")
        self.assertEqual(follow3.followedUser, Authors.objects.get(id=3))
        self.assertEqual(follow3.follower, Authors.objects.get(id=1))


class FollowRequestsTestCase(TestCase):
    def setUp(self):
        print("test follower requests model-----------------")
        Authors.objects.create(
            username="test_author_1",
            password="test_password",
            id=1, 
            host="//service", 
            displayName="test_author_11", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )
        
        Authors.objects.create(
            username="test_author_2",
            password="test_password",
            id=2, 
            host="//service", 
            displayName="test_author_22", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_3",
            password="test_password",
            id=3, 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )

        FollowRequests.objects.create(
            belongTo="gwghawegha",
            summary="test1",
            actor=Authors.objects.get(id=1),
            object=Authors.objects.get(id=2),
        )

        FollowRequests.objects.create(
            belongTo="gwgha123451235",
            summary="test2",
            actor=Authors.objects.get(id=2),
            object=Authors.objects.get(id=3),
        )

        FollowRequests.objects.create(
            belongTo="3462346agwegawg",
            summary="test3",
            actor=Authors.objects.get(id=3),
            object=Authors.objects.get(id=1),
        )

    def testExist(self):
        follow1 = FollowRequests.objects.get(belongTo="gwghawegha")
        self.assertEqual(follow1.belongTo, "gwghawegha")
        self.assertEqual(follow1.summary, "test1")
        self.assertEqual(follow1.actor, Authors.objects.get(id=1))
        self.assertEqual(follow1.object, Authors.objects.get(id=2))

        follow2 = FollowRequests.objects.get(belongTo="gwgha123451235")
        self.assertEqual(follow2.belongTo, "gwgha123451235")
        self.assertEqual(follow2.summary, "test2")
        self.assertEqual(follow2.actor, Authors.objects.get(id=2))
        self.assertEqual(follow2.object, Authors.objects.get(id=3))

        follow3 = FollowRequests.objects.get(belongTo="3462346agwegawg")
        self.assertEqual(follow3.belongTo, "3462346agwegawg")
        self.assertEqual(follow3.summary, "test3")
        self.assertEqual(follow3.actor, Authors.objects.get(id=3))
        self.assertEqual(follow3.object, Authors.objects.get(id=1))


class CommentsTestCase(TestCase):
    def setUp(self):
        print("test comments model-----------------")
        Authors.objects.create(
            username="test_author_1",
            password="test_password",
            id=1, 
            host="//service", 
            displayName="test_author_11", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )
        
        Authors.objects.create(
            username="test_author_2",
            password="test_password",
            id=2, 
            host="//service", 
            displayName="test_author_22", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_3",
            password="test_password",
            id=3, 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )

        Posts.objects.create(
            title="test_post_1",
            id="http://localhost:../authors/author_uuid/post/post_uuid1",
            source="http://localhost:../authors/author_uuid/post/post_uuid1",
            origin="http://localhost:../authors/author_uuid/post/post_uuid1",
            description="test_post_1",
            contentType="text/plain",
            content="test_post_1",
            author=Authors.objects.get(id=1),
            categories="test_post_1",
            count=0,
            published="2020-04-01T00:00:00Z",
            visibility="PUBLIC",
        )

        Posts.objects.create(
            title="test_post_2",
            id="http://localhost:../authors/author_uuid/post/post_uuid2",
            origin="http://localhost:../authors/author_uuid/post/post_uuid2",
            description="test_post_2",
            contentType="text/markdown",
            content="test_post_2",
            author=Authors.objects.get(id=2),
            categories="test_post_2",
            count=5,
            published="2020-04-01T00:00:00Z",
            visibility="FRIENDS",
        )

        Posts.objects.create(
            title="test_post_3",
            id="http://localhost:../authors/author_uuid/post/post_uuid3",
            source="http://localhost:../authors/author_uuid/post/post_uuid3",
            origin="http://localhost:../authors/author_uuid/post/post_uuid3",
            description="test_post_3",
            contentType="image",
            content="test_post_3",
            author=Authors.objects.get(id=3),
            count=100,
            published="2020-04-01T00:00:00Z",
            visibility="PRIVATE",
        )

        Comments.objects.create(
            author=Authors.objects.get(id=1),
            post=Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid1"),
            comment="test1",
            contentType="text/markdown",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )

        Comments.objects.create(
            author=Authors.objects.get(id=2),
            post=Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid2"),
            comment="test2",
            contentType="text/plain",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )

        Comments.objects.create(
            author=Authors.objects.get(id=3),
            post=Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid3"),
            comment="test3",
            contentType="text/markdown",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )

    def testExist(self):
        comment1 = Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1")
        self.assertEqual(comment1.author, Authors.objects.get(id=1))
        self.assertEqual(comment1.post, Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid1"))
        self.assertEqual(comment1.comment, "test1")
        self.assertEqual(comment1.contentType, "text/markdown")
        self.assertEqual(comment1.id, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1")
        assert(comment1.uuid!=None)
        assert(comment1.type=="comment")

        comment2 = Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2")
        self.assertEqual(comment2.author, Authors.objects.get(id=2))
        self.assertEqual(comment2.post, Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid2"))
        self.assertEqual(comment2.comment, "test2")
        self.assertEqual(comment2.contentType, "text/plain")
        self.assertEqual(comment2.id, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2")
        assert(comment2.uuid!=None)
        assert(comment2.type=="comment")

        comment3 = Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3")
        self.assertEqual(comment3.author, Authors.objects.get(id=3))
        self.assertEqual(comment3.post, Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid3"))
        self.assertEqual(comment3.comment, "test3")
        self.assertEqual(comment3.contentType, "text/markdown")
        self.assertEqual(comment3.id, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3")
        assert(comment3.uuid!=None)
        assert(comment3.type=="comment")


class LikesTestCase(TestCase):
    def setUp(self):
        print("test likes model-----------------")
        Authors.objects.create(
            username="test_author_1",
            password="test_password",
            id=1, 
            host="//service", 
            displayName="test_author_11", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )
        
        Authors.objects.create(
            username="test_author_2",
            password="test_password",
            id=2, 
            host="//service", 
            displayName="test_author_22", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_3",
            password="test_password",
            id=3, 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid1",
            summary="test1",
            author=Authors.objects.get(id=1),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid2",
            summary="test2",
            author=Authors.objects.get(id=2),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid3",
            author=Authors.objects.get(id=3),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )

    def testExist(self):
        like1 = Likes.objects.get(author=Authors.objects.get(id=1))
        self.assertEqual(like1.context, "http://localhost:../authors/author_uuid/post/post_uuid1")
        self.assertEqual(like1.summary, "test1")
        self.assertEqual(like1.author, Authors.objects.get(id=1))
        self.assertEqual(like1.object, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1")
        assert(like1.type=="like")

        like2 = Likes.objects.get(author=Authors.objects.get(id=2))
        self.assertEqual(like2.context, "http://localhost:../authors/author_uuid/post/post_uuid2")
        self.assertEqual(like2.summary, "test2")
        self.assertEqual(like2.author, Authors.objects.get(id=2))
        self.assertEqual(like2.object, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2")
        assert(like2.type=="like")

        like3 = Likes.objects.get(author=Authors.objects.get(id=3))
        self.assertEqual(like3.context, "http://localhost:../authors/author_uuid/post/post_uuid3")
        self.assertEqual(like3.summary, "A user likes your post")
        self.assertEqual(like3.author, Authors.objects.get(id=3))
        self.assertEqual(like3.object, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3")
        assert(like3.type=="like")
'''
class LikedTestCase(TestCase):
    def setUp(self):
        print("test liked model-----------------")
        Authors.objects.create(
            username="test_author_1",
            password="test_password",
            id=1, 
            host="//service", 
            displayName="test_author_11", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )
        
        Authors.objects.create(
            username="test_author_2",
            password="test_password",
            id=2, 
            host="//service", 
            displayName="test_author_22", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_3",
            password="test_password",
            id=3, 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid1",
            summary="test1",
            author=Authors.objects.get(id=1),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid2",
            summary="test2",
            author=Authors.objects.get(id=2),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid3",
            author=Authors.objects.get(id=3),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )

        liked11 = Liked.objects.create(

            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )            
        Liked11.items.set([Likes.objects.get(author=Authors.objects.get(id=1))])

        liked22 = Liked.objects.create(
            
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )
        liked22.items.set([Likes.objects.get(author=Authors.objects.get(id=2))])

        liked33 = Liked.objects.create(
            
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )
        liked33.items.set([Likes.objects.get(author=Authors.objects.get(id=1)),Likes.objects.get(author=Authors.objects.get(id=2))])
    
    def testExist(self):
        liked1 = Liked.objects.get(items="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1")
        self.assertEqual(liked1.items, [Likes.objects.get(author=Authors.objects.get(id=1))])
        self.assertEqual(liked1.object, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1")
        assert(liked1.type=="liked")

        liked2 = self.liked22 #Liked.objects.get(items="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2")
        self.assertEqual(liked2.items, [Likes.objects.get(author=Authors.objects.get(id=2))])
        self.assertEqual(liked2.object, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2")
        assert(liked2.type=="liked")

        liked3 = self.liked33 #Liked.objects.get(items="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3")
        self.assertEqual(liked3.items, [Likes.objects.get(author=Authors.objects.get(id=1)),Likes.objects.get(author=Authors.objects.get(id=2))])
        self.assertEqual(liked3.object, "http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3")
        assert(liked3.type=="liked")
'''
'''
class InboxTestCase(TestCase):
    def setUp(self):
        print("test inbox model-----------------")
        Authors.objects.create(
            username="test_author_1",
            password="test_password",
            id=1, 
            host="//service", 
            displayName="test_author_11", 
            url="//service/author/1", 
            github="http://github.com/test_author", 
            profileImage="url_to_profile_image"
        )
        
        Authors.objects.create(
            username="test_author_2",
            password="test_password",
            id=2, 
            host="//service", 
            displayName="test_author_22", 
            url=f"//service/author/2", 
            profileImage="url_to_profile_image"
        )

        Authors.objects.create(
            username="test_author_3",
            password="test_password",
            id=3, 
            url=f"//service/author/3", 
            profileImage="url_to_profile_image"
        )

        Posts.objects.create(
            title="test_post_1",
            id="http://localhost:../authors/author_uuid/post/post_uuid1",
            source="http://localhost:../authors/author_uuid/post/post_uuid1",
            origin="http://localhost:../authors/author_uuid/post/post_uuid1",
            description="test_post_1",
            contentType="text/plain",
            content="test_post_1",
            author=Authors.objects.get(id=1),
            categories="test_post_1",
            count=0,
            published="2020-04-01T00:00:00Z",
            visibility="PUBLIC",
        )

        Posts.objects.create(
            title="test_post_2",
            id="http://localhost:../authors/author_uuid/post/post_uuid2",
            origin="http://localhost:../authors/author_uuid/post/post_uuid2",
            description="test_post_2",
            contentType="text/markdown",
            content="test_post_2",
            author=Authors.objects.get(id=2),
            categories="test_post_2",
            count=5,
            published="2020-04-01T00:00:00Z",
            visibility="FRIENDS",
        )

        Posts.objects.create(
            title="test_post_3",
            id="http://localhost:../authors/author_uuid/post/post_uuid3",
            source="http://localhost:../authors/author_uuid/post/post_uuid3",
            origin="http://localhost:../authors/author_uuid/post/post_uuid3",
            description="test_post_3",
            contentType="image",
            content="test_post_3",
            author=Authors.objects.get(id=3),
            count=100,
            published="2020-04-01T00:00:00Z",
            visibility="PRIVATE",
        )

        Comments.objects.create(
            author=Authors.objects.get(id=1),
            post=Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid1"),
            comment="test1",
            contentType="text/markdown",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )

        Comments.objects.create(
            author=Authors.objects.get(id=2),
            post=Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid2"),
            comment="test2",
            contentType="text/plain",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )

        Comments.objects.create(
            author=Authors.objects.get(id=3),
            post=Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid3"),
            comment="test3",
            contentType="text/markdown",
            published="2020-04-01T00:00:00Z",
            id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )

        FollowRequests.objects.create(
            belongTo="gwghawegha",
            summary="test1",
            actor=Authors.objects.get(id=1),
            object=Authors.objects.get(id=2),
        )

        FollowRequests.objects.create(
            belongTo="gwgha123451235",
            summary="test2",
            actor=Authors.objects.get(id=2),
            object=Authors.objects.get(id=3),
        )

        FollowRequests.objects.create(
            belongTo="3462346agwegawg",
            summary="test3",
            actor=Authors.objects.get(id=3),
            object=Authors.objects.get(id=1),
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid1",
            summary="test1",
            author=Authors.objects.get(id=1),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1",
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid2",
            summary="test2",
            author=Authors.objects.get(id=2),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2",
        )

        Likes.objects.create(
            context="http://localhost:../authors/author_uuid/post/post_uuid3",
            author=Authors.objects.get(id=3),
            object="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3",
        )

        Inbox.objects.create(
            author=Authors.objects.get(id=1),
            items=[Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid1") ,Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid2")],
            comments=[Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1"),Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2")],
            followRequests=[FollowRequests.objects.get(belongTo="gwghawegha"),FollowRequests.objects.get(belongTo="gwgha123451235")],
            likes=[Likes.objects.get(author=Authors.objects.get(id=1)),Likes.objects.get(author=Authors.objects.get(id=2))],
        )

        Inbox.objects.create(
            author=Authors.objects.get(id=2),
            items=[Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid2") ,Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid3")],
            comments=[Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2"),Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3")],
            followRequests=[FollowRequests.objects.get(belongTo="gwgha123451235"),FollowRequests.objects.get(belongTo="3462346agwegawg")],
            likes=[Likes.objects.get(author=Authors.objects.get(id=2)),Likes.objects.get(author=Authors.objects.get(id=3))],
        )

        Inbox.objects.create(
            author=Authors.objects.get(id=3),
            items=[Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid3") ,Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid1")],
            comments=[Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3"),Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1")],
            followRequests=[FollowRequests.objects.get(belongTo="3462346agwegawg"),FollowRequests.objects.get(belongTo="gwghawegha")],
            likes=[Likes.objects.get(author=Authors.objects.get(id=3)),Likes.objects.get(author=Authors.objects.get(id=1))],
        )
    
    def testExist(self):
        inbox1 = Inbox.objects.get(author=Authors.objects.get(id=1))
        self.assertEqual(inbox1.author, Authors.objects.get(id=1))
        self.assertEqual(inbox1.items, [Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid1") ,Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid2")])
        self.assertEqual(inbox1.comments, [Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1"),Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2")])
        self.assertEqual(inbox1.followRequests, [FollowRequests.objects.get(belongTo="gwghawegha"),FollowRequests.objects.get(belongTo="gwgha123451235")])
        self.assertEqual(inbox1.likes, [Likes.objects.get(author=Authors.objects.get(id=1)),Likes.objects.get(author=Authors.objects.get(id=2))])
        self.assertEqual(inbox1.type, "inbox")

        inbox2 = Inbox.objects.get(author=Authors.objects.get(id=2))
        self.assertEqual(inbox2.author, Authors.objects.get(id=2))
        self.assertEqual(inbox2.items, [Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid2") ,Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid3")])
        self.assertEqual(inbox2.comments, [Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid2"),Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3")])
        self.assertEqual(inbox2.followRequests, [FollowRequests.objects.get(belongTo="gwgha123451235"),FollowRequests.objects.get(belongTo="3462346agwegawg")])
        self.assertEqual(inbox2.likes, [Likes.objects.get(author=Authors.objects.get(id=2)),Likes.objects.get(author=Authors.objects.get(id=3))])
        self.assertEqual(inbox2.type, "inbox")

        inbox3 = Inbox.objects.get(author=Authors.objects.get(id=3))
        self.assertEqual(inbox3.author, Authors.objects.get(id=3))
        self.assertEqual(inbox3.items, [Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid3") ,Posts.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid1")])
        self.assertEqual(inbox3.comments, [Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid3"),Comments.objects.get(id="http://localhost:../authors/author_uuid/post/post_uuid/comments/comment_uuid1")])
        self.assertEqual(inbox3.followRequests, [FollowRequests.objects.get(belongTo="3462346agwegawg"),FollowRequests.objects.get(belongTo="gwghawegha")])
        self.assertEqual(inbox3.likes, [Likes.objects.get(author=Authors.objects.get(id=3)),Likes.objects.get(author=Authors.objects.get(id=1))])
        self.assertEqual(inbox3.type, "inbox")
'''


    