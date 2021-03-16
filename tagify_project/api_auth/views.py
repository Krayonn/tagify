import json

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.db import IntegrityError


def sign_up_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    try:
        user = User.objects.create_user(username, password=password)
        user.save()
        login(request, user)
    except IntegrityError:
        return JsonResponse({'error':'That Username has already been taken'})

    return JsonResponse({'detail': 'Successfully logged in.'})


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    print('In login',username, password)
    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})
