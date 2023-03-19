# Generated by Django 4.1.7 on 2023-03-19 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allModels', '0007_alter_comments_uuid_alter_posts_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='uuid',
            field=models.CharField(default='9c36f032-3487-4c8c-9847-0d776495e85c', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='posts',
            name='uuid',
            field=models.CharField(default='ac6bc572-5d3c-4ac7-a3bb-d73d179436b8', max_length=255, unique=True),
        ),
    ]