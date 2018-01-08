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
from django.contrib import admin
from rest_framework.documentation import include_docs_urls
from . import views

urlpatterns = [
    url(r'^backend/account/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^backend/admin/', admin.site.urls),
    # url(r'^apis/$', views.api_root),
    url(r'^api/authentication/', include('authentication.urls')),
    url(r'^api/archive/', include('archive.urls')),
    url(r'^api/analysis/', include('analysis.urls')),
    url(r'^api/docs/', include_docs_urls(title='SNA 4 Slack APIs', public=True)),
]
