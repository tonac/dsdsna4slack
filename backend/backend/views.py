from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('accounts-list', request=request, format=format),
        'register': reverse('accounts-register', request=request, format=format),
        'login': reverse('rest_framework:login', request=request, format=format),
        'logout': reverse('rest_framework:logout', request=request, format=format),
        'api_token': reverse('api_get_token', request=request, format=format),
    })
