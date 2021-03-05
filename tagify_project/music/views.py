from django.shortcuts import render
from .models import Album
from .serializers import AlbumSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .retrieveMusic import getAlbums, getToken

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