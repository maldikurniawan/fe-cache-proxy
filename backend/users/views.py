from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import CreateUserSerializer
from django.http import JsonResponse
from rest_framework.pagination import LimitOffsetPagination
import json

# Create your views here.
# Create a user and to display
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    pagination_class = LimitOffsetPagination
    
#to retrieve, update or delete a user by ID
class UserRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    
def json(request):
    data = list(User.objects.values())
    return JsonResponse(data, safe=False)
