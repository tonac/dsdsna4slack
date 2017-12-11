from rest_framework import viewsets, permissions, status, response

from analysis.models import OverallMetrics
from analysis.permissions import HasMetricsPermission
from analysis.serializers import MakeOverallMetricsSerializer, OverallMetricsSerializer
from archive.models import Archive


class OverallMetricsViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, HasMetricsPermission)
    http_method_names = ['get', 'head', 'delete', 'post']

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return OverallMetrics.objects.filter(archive__user=self.request.user)
        elif self.action == 'create':
            return Archive.objects.filter(archive__user_id=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return MakeOverallMetricsSerializer
        elif self.action in ['list', 'retrieve']:
            return OverallMetricsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        archive = serializer.validated_data['archive']
        channels = serializer.validated_data['channels']
        graph_type = serializer.validated_data['graph_type']
        analysis_result = serializer.save(archive, channels, graph_type)
        return response.Response(analysis_result, status=status.HTTP_200_OK)
