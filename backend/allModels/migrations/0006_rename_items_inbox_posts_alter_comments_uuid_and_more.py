# Generated by Django 4.1.7 on 2023-03-21 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allModels', '0005_alter_comments_uuid_alter_posts_uuid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inbox',
            old_name='items',
            new_name='posts',
        ),
        migrations.AlterField(
            model_name='comments',
            name='uuid',
            field=models.CharField(default='2b0378ef-2867-41dd-95bf-19aa1a1b209c', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='posts',
            name='uuid',
            field=models.CharField(default='9a517446-6059-4aa6-aba0-db1fc75e215f', max_length=255, unique=True),
        ),
    ]