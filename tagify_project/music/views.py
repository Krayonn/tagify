from django.shortcuts import render
from .models import Album, Track
from .serializers import AlbumSerializer, TrackSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .retrieveMusic import getToken, getUserProfile, getAlbums, getPlaylists, getTracks, createPlaylistsFromTags
import json

class TrackList(generics.ListAPIView):
    # Lists all Tracks
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

@api_view((['GET']))
def hello_world(request):
    params = request.query_params
    return Response({"message": "Hello, world!"+params['test']+params['code']})

@api_view((['GET']))
def retrieveToken(request):
    params = request.query_params
    response = getToken(params['authCode'])
    return response
    
@api_view((['GET']))
def retrieveUserProfile(request):
    params = request.query_params
    data = getUserProfile(params['token'])
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
        params = request.query_params
        user = params['user']
        tracks = Track.objects.filter(user=user).distinct().order_by()
        print('query!', params)
        data = {}
        for track in tracks:
            data[track.track_id] = track.tags
        return Response(status=200,data=data)

    elif request.method == 'POST':
        print('Request in post',request.data)
        user = request.data['user']
        tracks = request.data['trackTags']
        print('User making request', user)
        for track in tracks:
            print('TRACK', track)
            print(str(tracks[track]))
            trackd = Track.objects.update_or_create(track_id=track, tags=str(tracks[track]), user=user)
            print('Added new track with it\'s tags to database: ',track)
        return Response(status=200)   

@api_view((['POST']))
def createPlaylist(request):
    print('Request in post',request.data)
    access_token = request.headers['Authorisation']
    user = request.headers['User']
    resp = createPlaylistsFromTags(access_token, user, request)
    return resp
