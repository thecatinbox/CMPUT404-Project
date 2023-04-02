# Generated by Django 4.1.7 on 2023-04-02 05:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('allModels', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Authors',
            fields=[
                ('username', models.CharField(default='', max_length=255, primary_key=True, serialize=False, unique=True)),
                ('password', models.CharField(default='', max_length=255)),
                ('type', models.CharField(default='author', editable=False, max_length=255)),
                ('uuid', models.CharField(max_length=255, unique=True)),
                ('id', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('url', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('host', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('displayName', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('github', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('profileImage', models.ImageField(blank=True, null=True, upload_to='profile_images')),
            ],
            options={
                'verbose_name_plural': 'Authors',
            },
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('uuid', models.CharField(default='45a05281-5fff-4683-8977-4f029d785079', max_length=255, unique=True)),
                ('type', models.CharField(default='comment', editable=False, max_length=255)),
                ('comment', models.TextField(blank=True, max_length=500, null=True)),
                ('contentType', models.CharField(choices=[('text/plain', 'PLAINTEXT'), ('text/markdown', 'MARKDOWN')], default='text/plain', max_length=15)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allModels.authors')),
            ],
            options={
                'verbose_name_plural': 'Comments',
            },
        ),
        migrations.CreateModel(
            name='FollowRequests',
            fields=[
                ('id', models.UUIDField(default='30391238-9bbe-43b1-b209-5f9cc47dd9aa', editable=False, primary_key=True, serialize=False)),
                ('belongTo', models.CharField(blank=True, default='', max_length=255)),
                ('type', models.CharField(default='Follow', editable=False, max_length=255)),
                ('summary', models.TextField(blank=True, default='', max_length=255)),
                ('actor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_sender', to='allModels.authors')),
                ('object', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_receiver', to='allModels.authors')),
            ],
            options={
                'verbose_name_plural': 'FollowRequests',
            },
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('uuid', models.CharField(default='a9ffb76e-7b94-47e9-8370-0c4eb439c5d2', max_length=255, unique=True)),
                ('type', models.CharField(default='post', editable=False, max_length=255)),
                ('title', models.CharField(default='Untitled', max_length=255)),
                ('id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('source', models.CharField(blank=True, max_length=255, null=True)),
                ('origin', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('contentType', models.CharField(choices=[('text/plain', 'PLAINTEXT'), ('text/markdown', 'COMMONMARK'), ('image', 'IMAGE')], default=('text/plain', 'PLAINTEXT'), max_length=15)),
                ('content', models.TextField(blank=True, max_length=500, null=True)),
                ('contentImage', models.ImageField(blank=True, null=True, upload_to='post_images')),
                ('categories', models.CharField(blank=True, max_length=255, null=True)),
                ('count', models.IntegerField(default=0)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('visibility', models.CharField(choices=[('PUBLIC', 'PUBLIC'), ('FRIENDS', 'FRIENDS'), ('PRIVATE', 'PRIVATE')], default=('PUBLIC', 'PUBLIC'), max_length=15)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='poster', to='allModels.authors')),
            ],
            options={
                'verbose_name_plural': 'Posts',
            },
        ),
        migrations.CreateModel(
            name='Shares',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='share', editable=False, max_length=255)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allModels.authors')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allModels.posts')),
            ],
            options={
                'verbose_name_plural': 'Shares',
            },
        ),
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.UUIDField(default='80d4a16c-05a1-4379-8aa6-1bddf5979123', editable=False, primary_key=True, serialize=False)),
                ('context', models.CharField(max_length=255)),
                ('summary', models.CharField(default='A user likes your post', max_length=64)),
                ('type', models.CharField(default='like', editable=False, max_length=255)),
                ('object', models.CharField(blank=True, max_length=200, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allModels.authors')),
            ],
            options={
                'verbose_name_plural': 'Likes',
            },
        ),
        migrations.CreateModel(
            name='Liked',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='liked', editable=False, max_length=255)),
                ('object', models.CharField(blank=True, max_length=200, null=True)),
                ('items', models.ManyToManyField(blank=True, to='allModels.likes')),
            ],
            options={
                'verbose_name_plural': 'Liked',
            },
        ),
        migrations.CreateModel(
            name='Inbox',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='inbox', editable=False, max_length=255)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allModels.authors')),
                ('comments', models.ManyToManyField(blank=True, to='allModels.comments')),
                ('followRequests', models.ManyToManyField(blank=True, to='allModels.followrequests')),
                ('likes', models.ManyToManyField(blank=True, to='allModels.likes')),
                ('posts', models.ManyToManyField(blank=True, to='allModels.shares')),
            ],
            options={
                'verbose_name_plural': 'Inboxes',
            },
        ),
        migrations.CreateModel(
            name='Followers',
            fields=[
                ('id', models.UUIDField(default='287836c2-d867-4984-97ae-ff5e95c2197b', editable=False, primary_key=True, serialize=False)),
                ('followedId', models.CharField(blank=True, max_length=255)),
                ('type', models.CharField(default='followers', editable=False, max_length=255)),
                ('followedUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followedUser', to='allModels.authors')),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follower', to='allModels.authors')),
            ],
            options={
                'verbose_name_plural': 'Followers',
            },
        ),
        migrations.AddField(
            model_name='comments',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='allModels.posts'),
        ),
    ]
