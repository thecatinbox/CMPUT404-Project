# Generated by Django 4.1.7 on 2023-03-02 11:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('allModels', '0002_rename_posts_post_alter_post_options'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Post',
            new_name='Posts',
        ),
        migrations.AlterModelOptions(
            name='posts',
            options={'verbose_name_plural': 'Posts'},
        ),
    ]