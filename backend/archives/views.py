import zipfile
import json
from os import listdir

from archives.models import Archive, SlackUser, Channel, Message
from rest_framework import viewsets, permissions
from rest_framework import status, generics
from archives.serializers import FileSerializer, ArchiveSerializer, SlackUserSerializer, SlackUserUploadSerializer, ChannelSerializer, ChannelUploadSerializer, MessageUploadSerializer
from archives.permissions import IsArchiveOwner
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser


class ArchiveViewSet(generics.ListCreateAPIView):
    parser_classes = (FileUploadParser,)
    serializer_class = FileSerializer
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner,)

    def get_queryset(self):
        return Archive.objects.filter(user=self.request.user)

    def create(self, request, filename):
        file_obj = request.data['file']
        file_serializer = FileSerializer(data={'file': file_obj})
        file_serializer.is_valid(raise_exception=True)
        archive = file_serializer.save(user=request.user)
        return Response(status=status.HTTP_201_CREATED)

