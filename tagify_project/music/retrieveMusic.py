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
    data = {
        'grant_type': 'authorization_code',
        'code': authCode,
        'redirect_uri': 'http://localhost:8000'
    }

    headers = {
        'Authorization': 'Basic '+os.getenv("CREDENTIALS")
    }

    r = requests.post('https://accounts.spotify.com/api/token', data=data, headers=headers)


    response = json.loads(r.content.decode('utf-8'))
    print(response)
    if (r.ok):
        print(response['access_token'])
        access_token = response['access_token']
        refresh_token = response['refresh_token']
    else:
        print('Something went wrong: ',r)
        return {"message": "Token could not be retrieved", "error": response}
    return {"access_token": access_token, "refresh_token": refresh_token}

def getAlbums(access_token):
    headers = {'Authorization': 'Bearer '+access_token}

    r = requests.get('https://api.spotify.com/v1/me/albums', headers=headers)
    albums_raw = r.content.decode('utf-8')

    _json = json.loads(albums_raw)
    albums = []
    for album in _json['items']:
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
    _json = json.loads(playlists_raw)
    playlists = []
    for playlist in _json['items']:
        tracks_href = playlist['tracks']['href']
        r = requests.get(tracks_href, headers=headers)
        playlists_tracks_raw = r.content.decode('utf-8')
        _json_tracks = json.loads(playlists_tracks_raw)
        tracks = []
        counter = 1
        for track in _json_tracks['items']:
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

def createPlaylistsFromTags(access_token, request):
    print('in createPlaylistsFromTags', request)
    request_data = request.data
    chosen_tags=request_data['chosenTags']

    # Get user id
    headers = {'Authorization': 'Bearer '+access_token}

    r = requests.get('https://api.spotify.com/v1/me/', headers=headers)

    profile_raw = r.content.decode('utf-8')
    _json = json.loads(profile_raw)

    if 'error' in _json.keys():
        print(_json)
        return Response(status=500, data=_json)

    user_id = _json['id']

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
        tracks += Track.objects.filter(tags__contains="'"+tag+"'").filter(user=request.user.username).distinct().order_by()

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
    _json = json.loads(playlist_raw)

    print('added to playlist',_json)
    return Response(status=200, data={'playlist_url': playlist_url, 'playlist_name': playlist_name})
    

# p=(getPlaylists('BQAWz2Cu_DNkG6L3veMDP-QPmNpCKPUIRdrMg6_rPZiX0li330J506o0FSBqg9vH4Nf0OhQDNgPR6kFv-gclkB3Tvg-7i7zpLJOnfMwbrKYgHZVXK9sDcOZjjG8t7J4nR-fJwuumuFuL9jBtNnnKebNw63BElTUy'))
# print(p[''])      


# getAlbums('test')