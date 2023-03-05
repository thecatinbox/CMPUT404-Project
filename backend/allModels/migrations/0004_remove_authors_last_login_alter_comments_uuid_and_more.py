# Generated by Django 4.1.7 on 2023-03-05 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('allModels', '0003_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='authors',
            name='last_login',
        ),
        migrations.AlterField(
            model_name='comments',
            name='uuid',
            field=models.CharField(default='02d05011-26ea-4eb3-b22f-a48b9e7a3d6d', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='posts',
            name='uuid',
            field=models.CharField(default='d14c1f4f-17ed-4013-9fde-6198a5cc48db', editable=False, max_length=255, unique=True),
        ),
    ]
