from rest_framework import viewsets, permissions, status, response
from rest_framework.parsers import FormParser, MultiPartParser

from archive.models import Archive
from archive.permissions import IsArchiveOwner
from archive.serializers import ArchiveSerializer, FileUploadSerializer


class ArchiveViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner,)
    parser_classes = (MultiPartParser, FormParser,)
    http_method_names = ['get', 'head', 'delete', 'post']

    def get_queryset(self):
        return Archive.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action in 'create':
            return FileUploadSerializer
        else:
            return ArchiveSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        archive = serializer.save(user=self.request.user)
        return response.Response(ArchiveSerializer(archive).data, status=status.HTTP_201_CREATED)
