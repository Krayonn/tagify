import requests
import pandas as pd
import json
from pathlib import Path  # Python 3.6+ only
from dotenv import load_dotenv
import os
from .models import Track
from rest_framework.response import Response


def getToken(authCode):
    print('Auth code: ',authCode)
    load_dotenv()
    print('REDIRECT',os.getenv("REDIRECT_URL"))
    data = {
        'grant_type': 'authorization_code',
        'code': authCode,
        'redirect_uri': os.getenv("REDIRECT_URL")
    }

    headers = {
        'Authorization': 'Basic '+os.getenv("CREDENTIALS")
    }

    r = requests.post('https://accounts.spotify.com/api/token', data=data, headers=headers)

    response = json.loads(r.content.decode('utf-8'))

    if (r.ok):
        print(response['access_token'])
        access_token = response['access_token']
        refresh_token = response['refresh_token']
    else:
        print('Something went wrong: ',r)
        data = {"message": "Token could not be retrieved", "error": response}
        return Response(status=500, data=data)

    user_profile = getUserProfile(access_token)
    data = {'access_token': access_token, 'refresh_token': refresh_token, 'user_profile': user_profile}
    return Response(status=200, data=data)

def getUserProfile(access_token):
    headers = {'Authorization': 'Bearer '+access_token}

    r = requests.get('https://api.spotify.com/v1/me/', headers=headers)

    profile_raw = r.content.decode('utf-8')
    profile_json = json.loads(profile_raw)

    if 'error' in profile_json.keys():
        print(profile_json)
        return Response(status=500, data=profile_json)

    user_id = profile_json['id']

    print('User_id', user_id)

    return(profile_json)

def getAlbums(access_token):
    headers = {'Authorization': 'Bearer '+access_token}

    r = requests.get('https://api.spotify.com/v1/me/albums', headers=headers)
    albums_raw = r.content.decode('utf-8')

    albums_json = json.loads(albums_raw)
    albums = []
    for album in albums_json['items']:
        album = album['album']
        tracks = [{
                    'id': track['id'],
                    'title': track['name'],
                    'track_number': track['track_number'],
                    'artists': [a['name'] for a in track['artists']]
                } for track in album['tracks']['items']]
        albums_dict = {
                'id': album['id'],
                'name': album['name'],
                'artist': album['artists'][0]['name'],
                'release_date': album['release_date'],
                'tracks': tracks,
                'images': album['images'] 
                }
        albums.append(albums_dict)

    return albums

def getPlaylists(access_token):
    headers = {'Authorization': 'Bearer '+access_token}

    r = requests.get('https://api.spotify.com/v1/me/playlists', headers=headers)
    playlists_raw = r.content.decode('utf-8')
    playlists_json = json.loads(playlists_raw)
    playlists = []
    for playlist in playlists_json['items']:
        tracks_href = playlist['tracks']['href']
        r = requests.get(tracks_href, headers=headers)
        playlists_tracks_raw = r.content.decode('utf-8')
        tracks_json = json.loads(playlists_tracks_raw)
        tracks = []
        counter = 1
        for track in tracks_json['items']:
            track = track['track']
            tracks.append({
                'id': track['id'],
                'title': track['name'],
                'track_number': counter,
                'images': track['album']['images'],
                'artists': [a['name'] for a in track['artists']]
            })
            counter+=1
        playlists.append({
            'id': playlist['id'],
            'images': playlist['images'],
            'name': playlist['name'],
            'description': playlist['description'],
            'tracks': tracks
        })

    return playlists

def getTracks(access_token):
    headers = {'Authorization': 'Bearer '+access_token}

    r = requests.get('https://api.spotify.com/v1/me/tracks', headers=headers)
    tracks_raw = r.content.decode('utf-8')
    tracks_json = json.loads(tracks_raw)
    tracks = []
    for track in tracks_json['items']:
        track = track['track']
        tracks.append({
            'id': track['id'],
            'title': track['name'],
            'images': track['album']['images'],
            'artists': [a['name'] for a in track['artists']]
        })
    return tracks

def createPlaylistsFromTags(access_token, user, request):
    print('in createPlaylistsFromTags', request)
    request_data = request.data
    chosen_tags=request_data['chosenTags']
    headers = {'Authorization': 'Bearer '+access_token}

    # Get user id
    profile_json = getUserProfile(access_token)

    user_id = profile_json['id']

    print('User_id', user_id)

    # Create new playlist
    playlist_name = '[Tagify] '+' - '.join(chosen_tags)
    create_data = {
        'name': playlist_name,
        'public': 'false'
    }
    r = requests.post(f'https://api.spotify.com/v1/users/{user_id}/playlists', headers=headers, data=json.dumps(create_data))

    playlist_create_raw = r.content.decode('utf-8')
    playlist_create_json = json.loads(playlist_create_raw)

    print("response",playlist_create_json)

    playlist_id = playlist_create_json['id']
    playlist_url = playlist_create_json['external_urls']['spotify']

    # Get tracks from db
    print('Chosen TAGS', chosen_tags)
    
    tracks = []
    for tag in chosen_tags:
        tracks += Track.objects.filter(tags__contains="'"+tag+"'").filter(user=user).distinct().order_by()

    # to get distinct values as that isn't working in above db call...
    print('tracks: ', tracks)
    tracks_set = set(tracks)
    tracks = list(tracks_set)

    uris = ['spotify:track:'+track.track_id for track in tracks]
    print('uris', uris)

    # Add tagged tracks to new playlist

    headers['Content-Type'] = 'application/json'
    
    data = {'uris': uris}
    r = requests.post(f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks', headers=headers, data=json.dumps(data))

    playlist_raw = r.content.decode('utf-8')
    playlist_json = json.loads(playlist_raw)

    print('added to playlist',playlist_json)
    return Response(status=200, data={'playlist_url': playlist_url, 'playlist_name': playlist_name})