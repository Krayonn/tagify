# Generated by Django 3.1.6 on 2021-03-13 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0004_auto_20210313_1948'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='user',
            field=models.CharField(max_length=50),
        ),
    ]
