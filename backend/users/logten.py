from django.http import JsonResponse, HttpResponse
from users.models import cache
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['GET'])

def getlog(request):
    
    #mengambil data
    caches = cache.objects.all()

    #mencetak semua data
    items = [item.idlog for item in caches]
    
    #mendapatkan seluruh data cache
    jumlah = len(items)

    #mengambil 10 data
    max = 10
    bandwith = jumlah-10

    #menyiapkan list
    ten_cache = []

    #melakukan perulangan 
    for i in range(bandwith, jumlah) :
        cachesget = cache.objects.get(idlog = i)
        
        log_entry = {
                    'timestamp': cachesget.timestamp,
                    'ip_address': cachesget.ip,
                    'url': cachesget.url
                }
        
        ten_cache.append(log_entry)

    
    return JsonResponse({"data": ten_cache}, safe=False)

    return 0        
    

