from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import CreateUserSerializer

# Create your views here.
# Create a user and to display
class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    
#to retrieve, update or delete a user by ID
class UserRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    
