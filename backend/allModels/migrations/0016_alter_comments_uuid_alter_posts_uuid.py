# Generated by Django 4.1.7 on 2023-03-23 06:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allModels', '0015_alter_comments_uuid_alter_posts_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='uuid',
            field=models.CharField(default='640c03de-6127-40d8-8462-599b6303598f', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='posts',
            name='uuid',
            field=models.CharField(default='aa15e7d0-0977-4eec-a530-70238d426866', max_length=255, unique=True),
        ),
    ]