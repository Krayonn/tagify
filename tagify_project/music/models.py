from django.db import models
import uuid

class Album(models.Model):
    idd = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)
    release_date = models.DateTimeField()

class Track(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    track_id = models.CharField(max_length=50)
    tags = models.CharField(max_length=200)
    user = models.CharField(max_length=50)

    # @classmethod
    # def create(self, **kwargs):
    #     track, created = self.objects.update_or_create(
    #         # track_id=kwargs['track_id'],  
    #         defaults={'track_id': kwargs['track_id'], 'tags': kwargs['tags'], 'user': kwargs['user']}
    #     )
    #     if created:
    #         print(f"Created new record for track {kwargs['track_id']}")
    #     else:
    #         print(f"Updated tags for track: {kwargs['track_id']}")
        # return track
