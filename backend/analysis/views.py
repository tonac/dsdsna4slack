from rest_framework import viewsets, permissions, status, response, generics

from analysis.models import OverallMetrics
from analysis.permissions import HasMetricsPermission
from analysis.serializers import MakeOverallMetricsSerializer, OverallMetricsSerializer
from archive.models import Archive


class OverallMetricsViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, HasMetricsPermission)
    http_method_names = ['get', 'head', 'delete', 'post', 'put']

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

    def update(self, request, *args, **kwargs):
        metrics = OverallMetrics.objects.filter(pk=kwargs.get('pk'), archive__user=request.user).first()
        if metrics:
            metrics.public = not metrics.public
            metrics.save()
            return response.Response({'link': metrics.public_key.hex, 'public': metrics.public},
                                     status=status.HTTP_200_OK)
        else:
            return response.Response('Metric not found', status=status.HTTP_403_FORBIDDEN)


class GetPublicAnalysis(generics.RetrieveAPIView):
    serializer_class = OverallMetricsSerializer
    queryset = OverallMetrics.objects.filter(public=True)
    lookup_field = 'public_key'
