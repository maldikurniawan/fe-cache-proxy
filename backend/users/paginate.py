from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from users.models import *
from rest_framework.response import Response
from rest_framework.filters import BaseFilterBackend, SearchFilter, OrderingFilter
from rest_framework import status, generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse
from rest_framework import pagination
from users.serializers import paginate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from users.serializers import paginate

class paginates (generics.ListAPIView):
    queryset = cache.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    pagination_class = pagination.LimitOffsetPagination
    serializer_class = paginate
    filterset_fields = ['idlog', 'timestamp', 'ip', 'url']
    search_fields = ['idlog', 'timestamp', 'ip', 'url']

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            response = {
                "status": status.HTTP_200_OK,
                "message": "Article Created",
                "data": serializer.data
            }
            return Response(response)
        except Exception as e:
            response = {
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Article Created : Failed",
                "data": "Null"
            }
            return Response(response)