from rest_framework import serializers
from .models import Album, Track


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'name', 'artist', 'release-date')


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ('track_id', 'tags', 'user')