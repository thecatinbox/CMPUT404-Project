# Generated by Django 4.1.7 on 2023-03-20 10:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('allModels', '0002_auto_20230320_0418'),
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
                ('uuid', models.CharField(default='c75afa26-926f-4997-b52b-623ae3e5e96d', max_length=255, unique=True)),
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
                ('belongTo', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('type', models.CharField(default='Follow', editable=False, max_length=255)),
                ('summary', models.TextField(blank=True, default='', max_length=25)),
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
                ('uuid', models.CharField(default='998ed90c-e81c-438d-9f57-f837e4602c11', max_length=255, unique=True)),
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
            name='Likes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
                ('items', models.ManyToManyField(blank=True, to='allModels.posts')),
                ('likes', models.ManyToManyField(blank=True, to='allModels.liked')),
            ],
            options={
                'verbose_name_plural': 'Inboxes',
            },
        ),
        migrations.CreateModel(
            name='Followers',
            fields=[
                ('followedId', models.CharField(max_length=255, primary_key=True, serialize=False)),
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
