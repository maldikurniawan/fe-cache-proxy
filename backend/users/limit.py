from django.http import JsonResponse, HttpResponse
from users.models import cache
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['GET'])

def short(request, batas, limit):
    
    try :
         #mengambil 10 data
         max = limit
         take = batas + max

         #menyiapkan list
         ten_cache = []

         #melakukan perulangan 
         for i in range(batas, take) :
            cachesget = cache.objects.get(idlog = i)
        
            log_entry = {
                    'timestamp': cachesget.timestamp,
                    'ip_address': cachesget.ip,
                    'url': cachesget.url
            }
        
            ten_cache.append(log_entry)

    
         return JsonResponse({"data": ten_cache}, safe=False)
    except :
         return JsonResponse({"data": "gagal"}, safe=False)