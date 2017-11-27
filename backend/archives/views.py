import zipfile
import json
from os import listdir

from archives.models import Archive, SlackUser, Channel, Message
from rest_framework import viewsets, permissions
from rest_framework import status
from archives.serializers import ArchiveSerializer, SlackUserSerializer, SlackUserUploadSerializer, ChannelSerializer, ChannelUploadSerializer, MessageSerializer, MessageUploadSerializer
from archives.permissions import IsArchiveOwner
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser


class ArchiveViewSet(viewsets.ModelViewSet):
    parser_classes = (FileUploadParser,)
    serializer_class = ArchiveSerializer
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner,)

    def get_queryset(self):
        return Archive.objects.filter(user=self.request.user)

    def create(self, request, filename):
        # get archive
        file_obj = request.data['file']
        slack_archive = zipfile.ZipFile(file_obj)   #
        #slack_archive = zipfile.ZipFile('zip3.zip')
        # check if zip file is valid
        if slack_archive.testzip() is None:
            # search for users.json and channels.json
            archive_files = slack_archive.namelist()
            if 'users.json' in archive_files and 'channels.json' in archive_files:
                # save archive
                archive_serializer = ArchiveSerializer(
                    data={'name': filename}, context={'request': request})   #
                #archive_serializer = ArchiveSerializer(data={'name': slack_archive.filename}, context={'request': request})
                archive_serializer.is_valid(raise_exception=True)
                archive = archive_serializer.save(user=request.user)
                # get users
                users_info = slack_archive.getinfo('users.json')
                users_file = slack_archive.open(users_info)
                users_list = json.load(users_file)
                users_file.close()
                # save users
                for user in users_list:
                    slack_user_serializer = SlackUserUploadSerializer(
                        data={'user_data': user})
                    slack_user_serializer.is_valid(raise_exception=True)
                    slack_user_serializer.save(archive=archive)
                # get channels
                channels_info = slack_archive.getinfo('channels.json')
                channels_file = slack_archive.open(channels_info)
                channels_list = json.load(channels_file)
                channels_file.close()
                # save channels
                for channel in channels_list:
                    channel_serializer = ChannelUploadSerializer(
                        data={'channel_data': channel})
                    channel_serializer.is_valid(raise_exception=True)
                    channel_serializer.save(archive=archive)
                # get messages
                for fileinfo in slack_archive.infolist():
                    # if channel file
                    if fileinfo.file_size > 0:
                        path = fileinfo.filename.split("/")
                        if len(path) > 1:
                            channel_name = path[0]
                            channel = Channel.objects.get(
                                archive=archive, name=channel_name)
                            messages_file = slack_archive.open(fileinfo)
                            messages_list = json.load(messages_file)
                            messages_file.close()
                            for msg in messages_list:
                                message_serializer = MessageUploadSerializer(
                                    data={'message_data': msg})
                                message_serializer.is_valid(
                                    raise_exception=True)
                                message_serializer.save(channel=channel)
                return Response(archive_serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class SlackUserViewSet(viewsets.ModelViewSet):
    serializer_class = SlackUserSerializer
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner,)
    queryset = SlackUser.objects.all()


class ChannelViewSet(viewsets.ModelViewSet):
    serializer_class = ChannelSerializer
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner,)
    queryset = Channel.objects.all()


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated, IsArchiveOwner,)
    queryset = Message.objects.all()
