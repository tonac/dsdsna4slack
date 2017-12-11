from rest_framework import viewsets, permissions, status, response

from analysis.models import OverallSubscription
from analysis.permissions import HasMetricsPermission
from analysis.serializers import MakeOverallSubscriptionSerializer, OverallSubscriptionSerializer
from archive.models import Archive


class OverallSubscriptionViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, HasMetricsPermission)
    http_method_names = ['get', 'head', 'delete', 'post']

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return OverallSubscription.objects.filter(archive__user=self.request.user)
        elif self.action == 'create':
            return Archive.objects.filter(archive__user_id=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return MakeOverallSubscriptionSerializer
        elif self.action in ['list', 'retrieve']:
            return OverallSubscriptionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        archive = serializer.validated_data['archive']
        channels = serializer.validated_data['channels']
        serializer.save(archive, channels)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
