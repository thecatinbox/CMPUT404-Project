# Generated by Django 4.1.7 on 2023-03-23 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allModels', '0013_alter_comments_uuid_alter_posts_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='uuid',
            field=models.CharField(default='c5d14ee3-5a37-4326-9d9c-5a6b659a8a22', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='posts',
            name='uuid',
            field=models.CharField(default='229073a7-d6ea-4a31-a3d8-df6d20c7b183', max_length=255, unique=True),
        ),
    ]