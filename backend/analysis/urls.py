from django.conf.urls import url, include
from rest_framework import routers

from analysis.views import OverallMetricsViewSet

router = routers.DefaultRouter()
router.register(r'v1/overall-metrics', OverallMetricsViewSet, base_name='overall_metrics')

urlpatterns = [
    url(r'^', include(router.urls)),
]
