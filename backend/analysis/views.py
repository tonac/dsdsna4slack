from rest_framework import viewsets, permissions
from rest_framework.parsers import FormParser, MultiPartParser

from analysis.models import OverallSubscription
from analysis.permissions import HasMetricsPermission
from analysis.serializers import MakeOverallSubscriptionSerializer, OverallSubscriptionSerializer
from archive.models import Archive
from archive.permissions import IsArchiveOwner


class OverallSubscriptionViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner, HasMetricsPermission)
    parser_classes = (MultiPartParser, FormParser,)
    http_method_names = ['get', 'post']

    def get_queryset(self):
        if self.action == 'list':
            return OverallSubscription.objects.filter(archive__user_id=self.request.user)
        elif self.action == 'create':
            return Archive.objects.filter(archive__user_id=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return MakeOverallSubscriptionSerializer
        elif self.action == 'list':
            return OverallSubscriptionSerializer

    # def create(self, request, *args, **kwargs):
    # serializer = self.get_serializer(data=request.data)
    # serializer.is_valid(raise_exception=True)
    # archive = serializer.save(user=self.request.user)
    # return response.Response(ArchiveSerializer(archive).data, status=status.HTTP_201_CREATED)
