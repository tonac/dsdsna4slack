from rest_framework.authtoken import views as views_rest
from django.conf.urls import url, include
from django.contrib import admin
from authentication import views

urlpatterns = [
    url(r'^api-accounts/$', views.UserList.as_view(), name='accounts-list'),
    url(r'^api-register/$', views.create_account, name='accounts-register'),
    url(r'^api-token-auth/$', views_rest.obtain_auth_token, name='api_get_token'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
]
