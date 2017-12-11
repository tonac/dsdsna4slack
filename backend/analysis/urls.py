from django.conf.urls import url, include
from rest_framework import routers

from analysis.views import OverallSubscriptionViewSet

router = routers.DefaultRouter()
router.register(r'v1/overall-subscription', OverallSubscriptionViewSet, base_name='overall-mention-metrics')

urlpatterns = [
    url(r'^', include(router.urls)),
]
