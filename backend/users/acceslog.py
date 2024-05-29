from rest_framework.decorators import api_view
from rest_framework.response import Response, SimpleTemplateResponse
from django.http import JsonResponse, HttpResponse
import paramiko
from django.views.decorators.csrf import csrf_exempt
import json
from users.models import cache
from django.db.models import Sum
from django.shortcuts import redirect

def paramikoact(host, por, nama, sandi, hitung ):
    # Definisi
    hostname = host
    port = por  # Port SSH default
    username = nama
    password = sandi  # Pertimbangkan penggunaan autentikasi kunci publik

    #jumlah semua data di database
    sumdatabase = hitung

    # Lokasi file log akses Squid
    squid_log_path = "/var/log/squid/access.log"

    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        #mengambil smua data di data base


        # Menghubungkan ke server
        ssh_client.connect(hostname, port, username, password)
        
        # Membaca isi file log akses Squid
        stdin, stdout, stderr = ssh_client.exec_command(f"cat {squid_log_path}")

        log_data = stdout.read().decode()
        
        log_errors = stderr.read().decode()

        if log_errors:

            return JsonResponse({"status": "error", "message": log_errors})

        log_data = log_data.split('\n')

        # Membuat list kosong untuk menyimpan acces data log dalam format JSON
        json_logs = []

        #index data yang diambil
        datas = []

        # Memproses setiap baris log
        for line in log_data:
            
            # Lakukan parsing baris log dan sesuaikan dengan format log Squid
            
            # Misalnya, jika formatnya adalah "timestamp IP_ADDRESS URL"
            
            parts = line.split()
            
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


        #mengambil jumlah semua data acces log 

        jumlah = len(json_logs)

        #####

        #membuat memory sementara database

        database = [0] * jumlah

        #memasukan kedalam database

        if (sumdatabase != jumlah) :
          for i in range(sumdatabase, jumlah) :
            database[i] = cache(idlog=i, timestamp=json_logs[i]['timestamp'], ip=json_logs[i]['ip_address'],url=json_logs[i]['url'])
            database[i].save()
            datas.append(i)

        # Mengembalikan hasil dalam format JSON
        return json_logs

    except Exception as e:
        return "error"

@csrf_exempt
@api_view(['GET'])

def getcache(request) :
    try :
        idlog = []
        #menampung semua data dari database
        semuacache = cache.objects.all()

        #jumlah semua data cache
        for item in semuacache :
            idlog.append(item.idlog)

        jumlah = len(idlog) 
        
        return JsonResponse({"data": paramikoact("192.168.120.41", 22, "root", "1234", jumlah )}, safe=False)
        
    except :
       return HttpResponse("gagal")
    
    finally:
        print("SSH connection closed")


# sukses input database
# def getcache(request):
#     # Definisi
#     hostname = "192.168.120.41"
#     port = 22  # Port SSH default
#     username = "root"
#     password = "1234"  # Pertimbangkan penggunaan autentikasi kunci publik

#     # Lokasi file log akses Squid
#     squid_log_path = "/var/log/squid/access.log"

#     ssh_client = paramiko.SSHClient()
#     ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

#     try:
#         #mengambil smua data di data base


#         # Menghubungkan ke server
#         ssh_client.connect(hostname, port, username, password)
        
#         # Membaca isi file log akses Squid
#         stdin, stdout, stderr = ssh_client.exec_command(f"cat {squid_log_path}")

#         log_data = stdout.read().decode()
        
#         log_errors = stderr.read().decode()

#         if log_errors:

#             return JsonResponse({"status": "error", "message": log_errors})

#         log_data = log_data.split('\n')

#         # Membuat list kosong untuk menyimpan acces data log dalam format JSON
#         json_logs = []

#         #index data yang diambil
#         datas = []

#         # Memproses setiap baris log
#         for line in log_data:
            
#             # Lakukan parsing baris log dan sesuaikan dengan format log Squid
            
#             # Misalnya, jika formatnya adalah "timestamp IP_ADDRESS URL"
            
#             parts = line.split()
            
#             if len(parts) >= 7:  # Pastikan ada cukup bagian dalam baris log
#                 timestamp = parts[0]
#                 ip_address = parts[2]
#                 url = parts[6]

#                 # Membuat entitas log dalam format JSON
#                 log_entry = {
#                     'timestamp': timestamp,
#                     'ip_address': ip_address,
#                     'url': url
#                 }

#                 # Menambahkan entitas log ke dalam list json_logs
#                 json_logs.append(log_entry)


#         #mengambil jumlah semua data acces log 

#         jumlah = len(json_logs)

#         #membuat memory sementara database

#         database = [0] * jumlah

#         #memasukan kedalam database
        
#         for i in range(jumlah) :
#             database[i] = cache(idlog=i, timestamp=json_logs[i]['timestamp'], ip=json_logs[i]['ip_address'],url=json_logs[i]['url'])
#             database[i].save()
#             datas.append(i)
        
#         # Mengembalikan hasil dalam format JSON
#         return JsonResponse({"data": json_logs[datas[jumlah-1]]['url']}, safe=False)

#     except Exception as e:
#         return JsonResponse({"status": "error", "message": str(e)})

#     finally:
#         ssh_client.close()
#         print("SSH connection closed")

# ####sukses######
# def getcache(request):
#     # Definisi
#     hostname = "192.168.120.41"
#     port = 22  # Port SSH default
#     username = "root"
#     password = "1234"  # Pertimbangkan penggunaan autentikasi kunci publik

#     # Lokasi file log akses Squid
#     squid_log_path = "/var/log/squid/access.log"

#     ssh_client = paramiko.SSHClient()
#     ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

#     try:
#         # Menghubungkan ke server
#         ssh_client.connect(hostname, port, username, password)
        
#         # Membaca isi file log akses Squid
#         stdin, stdout, stderr = ssh_client.exec_command(f"cat {squid_log_path}")

#         log_data = stdout.read().decode()
        
#         log_errors = stderr.read().decode()

#         if log_errors:

#             return JsonResponse({"status": "error", "message": log_errors})

#         log_data = log_data.split('\n')

#         # Membuat list kosong untuk menyimpan data acces log dalam format JSON
#         json_logs = []

#         # Memproses setiap baris log
#         for line in log_data:
            
#             # Lakukan parsing baris log dan sesuaikan dengan format log Squid
            
#             # Misalnya, jika formatnya adalah "timestamp IP_ADDRESS URL"
            
#             parts = line.split()
            
#             if len(parts) >= 7:  # Pastikan ada cukup bagian dalam baris log
#                 timestamp = parts[0]
#                 ip_address = parts[2]
#                 url = parts[6]

#                 # Membuat entitas log dalam format JSON
#                 log_entry = {
#                     'timestamp': timestamp,
#                     'ip_address': ip_address,
#                     'url': url
#                 }

#                 # Menambahkan entitas log ke dalam list json_logs
#                 json_logs.append(log_entry)

#         # Mengembalikan hasil dalam format JSON
#         jumlah = len(json_logs)
#         return JsonResponse({"data": json_logs}, safe=False)

#     except Exception as e:
#         return JsonResponse({"status": "error", "message": str(e)})

#     finally:
#         ssh_client.close()
#         print("SSH connection closed")

#############gagal###########

# def getcache (request) :
#     #Defination
#     hostname = "192.168.120.41"
#     port = 22  # Port SSH default
#     username = "root"
#     password = "1234"  # Pertimbangkan penggunaan autentikasi kunci publik

#     # Lokasi file log akses Squid
#     squid_log_path = "/var/log/squid/access.log"
#     # awk = 'BEGIN { print "[" } { print "{\"timestamp\":\"" $1 "\",\"ip\":\"" $3 "\",\"url\":\"" $7 "\"}," } END { print "]"}' 
#     # calamaris -a
#     # awk '{print $1, $3, $7}'
#     # awk '{ ipcount[$3]++ } END { for (ip in ipcount) print ip, ipcount[ip] }'


#     ssh_client = paramiko.SSHClient()
#     ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

#     try:
#         # Menghubungkan ke server
#         ssh_client.connect(hostname, port, username, password)
        
#         # Membaca isi file log akses Squid
#         stdin, stdout, stderr = ssh_client.exec_command(f"cat {squid_log_path}")
#         log_data = stdout.read().decode()
#         log_errors = stderr.read().decode()

#         log_data = log_data.split('\n')

#         # Membuat list kosong untuk menyimpan data log dalam format JSON
#         json_logs = []

#          # Memproses setiap baris log
#         for line in log_data:
            
#             # Lakukan parsing baris log dan sesuaikan dengan format log Squid
#             # Misalnya, jika formatnya adalah "timestamp IP_ADDRESS URL"
            
#             parts = line.split()
#             if len(parts) >= 3:
#                 timestamp = parts[0]
#                 ip_address = parts[2]
#                 url = parts[3]

#                 # Membuat entitas log dalam format JSON
#                 log_entry = {
#                     "timestamp": timestamp,
#                     "ip_address": ip_address,
#                     "url": url
#                 }

#                 # Menambahkan entitas log ke dalam list json_logs
#                 json_logs.append(log_entry)

#         # Menampilkan hasil
#         if log_errors:
#             return HttpResponse("Error reading log:")
#         else:
#             return HttpResponse(json_logs)
#     except :
#         return HttpResponse("gagal")
   

# # 1. Membuat Model Django
# from django.db import models

# class SquidAccessLog(models.Model):
#     url = models.CharField(max_length=200)
#     request_time = models.DateTimeField()
#     user_ip = models.CharField(max_length=50)
#     # Tambahkan bidang lain sesuai kebutuhan

# # 2. Membaca dan Memproses Log
# def process_squid_log():
#     with open('path/to/squid/access.log', 'r') as f:
#         for line in f:
#             # Proses setiap baris log
#             parts = line.split()
#             url = parts[0]
#             request_time = parts[1]  # Misalnya, perlu di-parse sesuai format timestamp
#             user_ip = parts[2]
#             # Simpan data ke database
#             SquidAccessLog.objects.create(url=url, request_time=request_time, user_ip=user_ip)
#             # Anda mungkin perlu menambahkan logika tambahan untuk menangani kesalahan atau duplikat, dll.

# # 3. Menyimpan Data ke Database
# process_squid_log()

# # 4. Jadwalkan Proses
# # Anda dapat menggunakan cron job atau tugas terjadwal serupa untuk menjalankan process_squid_log secara teratur
