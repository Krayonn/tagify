from django.shortcuts import render
from .models import Album, Track
from .serializers import AlbumSerializer, TrackSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .retrieveMusic import getToken, getAlbums, getPlaylists, getTracks, createPlaylistsFromTags
import json

class TrackList(generics.ListAPIView):
    # Lists all Tracks
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    # Add filtering via query params
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['compound_id', 'num_rings']

@api_view((['GET']))
def hello_world(request):
    params = request.query_params
    return Response({"message": "Hello, world!"+params['test']+params['code']})

@api_view((['GET']))
def retrieveToken(request):
    params = request.query_params
    data = getToken(params['authCode'])
        
    return Response(data)

@api_view((['GET']))
def retrieveAlbums(request):
    params = request.query_params
    data = getAlbums(params['token'])
    return Response(data)

@api_view((['GET']))
def retrievePlaylists(request):
    params = request.query_params
    data = getPlaylists(params['token'])
    return Response(data)

@api_view((['GET']))
def retrieveTracks(request):
    params = request.query_params
    data = getTracks(params['token'])
    return Response(data)

@api_view((['POST','GET']))
def taggedTracks(request):

    if request.method == 'GET':
        # tracks = Track.objects.filter(user=request.user.username).distinct().order_by()
        tracks = Track.objects.filter(user='user1').distinct().order_by()
        data = {}
        for track in tracks:
            data[track.track_id] = track.tags
        return Response(status=200,data=data)

    elif request.method == 'POST':
        print('Request in post',request.data)
        print('User making request', request.user)
        for track in request.data:
            print('TRACK', track)
            print(str(request.data[track]))
            trackd = Track.objects.update_or_create(track_id=track, tags=str(request.data[track]), user=request.user.username)
            print('Added new track with it\'s tags to database: ',track)
        return Response(status=200)   

@api_view((['POST']))
def createPlaylist(request):
    print('Request in post',request.data)
    params = request.query_params
    resp = createPlaylistsFromTags(params['token'], request)
    return resp
