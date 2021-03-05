from django.urls import path
from . import views

urlpatterns = [
    path('api/yo', views.hello_world),
    path('api/token', views.retrieveToken),
    path('api/albums', views.retrieveAlbums)
]