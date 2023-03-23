# Generated by Django 4.1.7 on 2023-03-23 05:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allModels', '0010_alter_comments_uuid_alter_posts_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='uuid',
            field=models.CharField(default='e5950c19-a902-48fb-a200-f826f7421c2c', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='posts',
            name='uuid',
            field=models.CharField(default='0bd6e48a-a2e7-4cec-ad64-dc1c717e6e9f', max_length=255, unique=True),
        ),
    ]
