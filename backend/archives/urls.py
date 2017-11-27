from django.conf.urls import url, include
from backend import views

from archives.views import ArchiveViewSet

urlpatterns = [
    url(r'^', ArchiveViewSet.as_view()),
]