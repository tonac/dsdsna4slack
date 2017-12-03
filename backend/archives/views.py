from rest_framework import viewsets, permissions
from rest_framework.parsers import FormParser, MultiPartParser
from archives.models import Archive, FileUpload
from archives.serializers import ArchiveSerializer, FileUploadSerializer
from archives.permissions import IsArchiveOwner


class ArchiveViewSet(viewsets.ModelViewSet):
    serializer_class = ArchiveSerializer
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner,)

    def get_queryset(self):
        return Archive.objects.filter(user=self.request.user)


class FileUploadViewSet (viewsets.ModelViewSet):
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer
    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner,)

    def perform_create(self, serializer):
        # deserialize data and save to db
        serializer.save(user=self.request.user,
                        datafile=self.request.data.get('datafile'))
