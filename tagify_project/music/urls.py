from django.urls import path
from . import views

urlpatterns = [
    path('yo/', views.hello_world),
    path('token/', views.retrieveToken),
    path('albums/', views.retrieveAlbums),
    path('playlists/', views.retrievePlaylists),
    path('tracks/', views.retrieveTracks),
    path('taggedTracks/', views.taggedTracks),
    path('getTagTracks/', views.TrackList.as_view()),
    path('createPlaylist/', views.createPlaylist)
]