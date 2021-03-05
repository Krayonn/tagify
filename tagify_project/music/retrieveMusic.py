import requests
import pandas as pd
import json
from pathlib import Path  # Python 3.6+ only
from dotenv import load_dotenv
import os

def getToken(authCode):

    load_dotenv()
    data = {
        'grant_type': 'authorization_code',
        'code': authCode,
        'redirect_uri': 'http://localhost:8080' 
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
    headers = {
        'Authorization': 'Bearer '+access_token}

    r = requests.get('https://api.spotify.com/v1/me/albums', headers=headers)
    albums_raw = r.content.decode('utf-8')
    # print(albums)
    # with open('albums.json', "w", encoding="utf-8") as f:
        # f.write(albums)
    # with open('albums.json', "r", encoding="utf-8") as f:
        # albums=f.read()

    _json = json.loads(albums_raw)
    albums = []
    for album in _json['items']:
        album = album['album']
        tracks = [{
                    'id': track['id'],
                    'title': track['name'],
                    'track_number': track['track_number']
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

# getAlbums('test')