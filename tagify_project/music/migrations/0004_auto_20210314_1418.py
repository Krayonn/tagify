# Generated by Django 3.1.6 on 2021-03-14 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0003_auto_20210314_1412'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
