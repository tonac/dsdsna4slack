from django.conf.urls import url, include
from rest_framework import routers
from archives.views import ArchiveViewSet, FileUploadViewSet

router = routers.DefaultRouter()
router.register(r'archives', ArchiveViewSet, base_name='archive')
router.register(r'upload', FileUploadViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
]
