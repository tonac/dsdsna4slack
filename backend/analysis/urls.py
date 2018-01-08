from django.conf.urls import url, include
from rest_framework import routers

from analysis.views import OverallMetricsViewSet, GetPublicAnalysis

router = routers.DefaultRouter()
router.register(r'v1/overall-metrics', OverallMetricsViewSet, base_name='overall_metrics')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^v1/share/(?P<public_key>.{32})/$', GetPublicAnalysis.as_view()),
]
