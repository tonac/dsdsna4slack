"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from backend import views

from rest_framework import routers
from archives.views import ArchiveViewSet, SlackUserViewSet, ChannelViewSet, MessageViewSet

router = routers.DefaultRouter()
router.register(r'archives', ArchiveViewSet, base_name='archive')
router.register(r'slack_users', SlackUserViewSet, base_name='slackuser')
router.register(r'channels', ChannelViewSet, base_name='channel')
router.register(r'messages', MessageViewSet, base_name='message')

urlpatterns = [
    url(r'^apis/$', views.api_root),
    url(r'^', include(router.urls)),
    url(r'^', include('authentication.urls')),
    #url(r'archives/', include('archives.urls')),
]
