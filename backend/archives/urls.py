from django.conf.urls import url, include
from backend import views
from rest_framework import routers

from archives.views import ArchiveViewSet, ChannelViewSet, SlackUserViewSet

router = routers.DefaultRouter()
router.register(r'archives', ArchiveViewSet, base_name='archive')
router.register(r'slackusers', SlackUserViewSet, base_name='slackuser')
router.register(r'archives', ChannelViewSet, base_name='channel')


urlpatterns = [
    url(r'^', include(router.urls)),
]