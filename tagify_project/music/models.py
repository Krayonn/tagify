from django.db import models

class Album(models.Model):
    idd = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)
    release_date = models.DateTimeField()
