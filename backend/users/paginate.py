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
import paramiko

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
        



def cachedatabase():
    # mengambil orm object cache
    cadata = cache.objects.all()

    # deklarasi idlog
    idlog = []

    # mengambil data id log
    for item in cadata:
        idlog.append(item.idlog)

    # deklarasi
    jumlah = len(idlog)

    return idlog, jumlah


def itemparse(items):
    # membuat list
    json_logs = []

    for item in items:
        # Lakukan parsing baris log dan sesuaikan dengan format log Squid
        # Misalnya, jika formatnya adalah "timestamp IP_ADDRESS URL"
        parts = item.split()

        if len(parts) >= 7:  # Pastikan ada cukup bagian dalam baris log
            timestamp = parts[0]
            ip_address = parts[2]
            url = parts[6]

            # Membuat entitas log dalam format JSON
            log_entry = {
                'timestamp': timestamp,
                'ip_address': ip_address,
                'url': url
            }

            # Menambahkan entitas log ke dalam list json_logs
            json_logs.append(log_entry)

            jumlah = len(json_logs)

    return json_logs, jumlah


@csrf_exempt
@api_view(['GET'])
def updatecache(request):
    try:
        # deklarasi configurasi akun server
        hostname = '192.168.120.41'
        username = 'root'
        password = '1234'
        port = 22

        # lokasi squid
        squid_log_path = '/var/log/squid/access.log'
        # menggunakan paramiko
        parami = paramiko.SSHClient()
        parami.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # koneksi ssh
        # Menghubungkan ke server
        parami.connect(hostname, port, username, password)

        # melakukan perintah ssl
        stdin, stdata, stderror = parami.exec_command(f"cat {squid_log_path}")

        data = stdata.read().decode()

        error = stderror.read().decode()

        if error:
            return JsonResponse({"status": "error", "message": error})

        # parse datacase
        datacache = data.split('\n')

        # mengambil idcache
        idlog, jumlahbase = cachedatabase()

        acceslog, jumlahcase = itemparse(datacache)

        # membuat memory sementara database

        database = [0] * jumlahcase

        # memasukan kedalam database

        if (jumlahbase != jumlahcase):
            for i in range(jumlahbase, jumlahcase):
                database[i] = cache(idlog=i, timestamp=acceslog[i]['timestamp'],
                                    ip=acceslog[i]['ip_address'], url=acceslog[i]['url'])
                database[i].save()

        return Response({'message': 'Data valid'}, status=status.HTTP_200_OK)

    except:

        return Response({'message': 'Data in valid'}, status=status.HTTP_400_BAD_REQUEST)