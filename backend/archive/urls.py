from django.conf.urls import url, include
from rest_framework import routers

from archive.views import ArchiveViewSet

router = routers.DefaultRouter()
router.register(r'v1/archive', ArchiveViewSet, base_name='archive')

urlpatterns = [
    url(r'^', include(router.urls)),
]
