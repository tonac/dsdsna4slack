from rest_framework.authtoken import views as views_rest
from django.conf.urls import url
from authentication import views

urlpatterns = [
    url(r'^v1/accounts/$', views.UserList.as_view(), name='accounts'),
    url(r'^v1/get-token/$', views_rest.obtain_auth_token, name='get_token'),
]
