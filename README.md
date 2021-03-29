# Tagify
https://tagify.eu.pythonanywhere.com/

Allows Spotify users to browse their saved songs from Spotify, tag them with customs tags and build dynamic playlists on the fly.

This avoids managing long lists of playlist and remembering which songs are already added to them, instead making it clearly visible what songs would be included in a genereated playlists. Since the tags are saved to a database the playlists can be removed and recreated with ease.

## Required
All that is required is a Spotify playlist and to accept that the tagify Spotify API app can access your spoitify data

## Tech stack
This uses React/Redux for the frontend and Django for the backend with a sqlite database (for now)

## Limitations
Currently this is a demo version as I am still building out the functionality and fixing issues. The number of albums/playlists that are retrieved is limited for the time being.
