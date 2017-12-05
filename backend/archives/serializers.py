import json
import zipfile
import datetime
from rest_framework import serializers
from archives.models import Archive, SlackUser, Channel, Message, FileUpload


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ('id', 'name')


class SlackUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlackUser
        fields = ('id', 'name')


class ArchiveSerializer(serializers.ModelSerializer):
    channels = ChannelSerializer(read_only=True, many=True)
    #slackusers = SlackUserSerializer(read_only=True, many=True)

    class Meta:
        model = Archive
        fields = ('id', 'name', 'uploaded', 'channels')


class SlackUserUploadSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=10)

    class Meta:
        model = SlackUser
        fields = ('id', 'team_id', 'name')

    def create(self, validated_data):
        return SlackUser.objects.create(slack_id=validated_data['id'], team_id=validated_data['team_id'], name=validated_data['name'], archive=validated_data['archive'])


class SlackUserField(serializers.SlugRelatedField):

    def get_queryset(self):
        archive = self.context['archive']
        queryset = SlackUser.objects.filter(archive=archive)
        return queryset


class ChannelUploadSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=10)
    members = SlackUserField(many=True, slug_field='slack_id')

    class Meta:
        model = Channel
        fields = ('id', 'name', 'members')

    def create(self, validated_data):
        channel = Channel.objects.create(
            channel_id=validated_data['id'], name=validated_data['name'], archive=validated_data['archive'])
        channel.members = validated_data['members']
        channel.save()
        return channel


class MessageUploadSerializer(serializers.ModelSerializer):
    user = SlackUserField(many=False, slug_field='slack_id', required=False)
    ts = serializers.FloatField()

    class Meta:
        model = Message
        fields = ('user', 'text', 'ts')

    def create(self, validated_data):
        return Message.objects.create(slackuser=validated_data.get('user'), channel=validated_data['channel'], text=validated_data['text'], ts=datetime.datetime.fromtimestamp(validated_data['ts']))


class FileUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = FileUpload
        fields = ('datafile',)

    def validate_datafile(self, value):
        try:
            slack_archive = zipfile.ZipFile(value)
        except zipfile.BadZipFile:
            raise serializers.ValidationError("Archive is not a zip file")
        if slack_archive.testzip() is not None:
            raise serializers.ValidationError(
                "Archive is not a valid zip file")
        archive_files = slack_archive.namelist()
        if 'users.json' not in archive_files or 'channels.json' not in archive_files:
            raise serializers.ValidationError(
                "Archive must have users.json and channels.json files")
        return value

    def create(self, validated_data):
        file_upload = FileUpload.objects.create(**validated_data)
        # create archive instance
        slack_archive = zipfile.ZipFile(file_upload.datafile)
        archive_serializer = ArchiveSerializer(
            data={'name': slack_archive.filename})
        archive_serializer.is_valid(raise_exception=True)
        archive = archive_serializer.save(user=file_upload.user)
        # extract data from archive
        # get users
        users_file = slack_archive.open('users.json')
        users_list = json.load(users_file)
        users_file.close()
        # save users
        slack_user_serializer = SlackUserUploadSerializer(
            data=users_list, many=True)
        slack_user_serializer.is_valid(raise_exception=True)
        slack_user_serializer.save(archive=archive)
        # get channels
        channels_file = slack_archive.open('channels.json')
        channels_list = json.load(channels_file)
        channels_file.close()
        # save channels
        channel_serializer = ChannelUploadSerializer(
            data=channels_list, many=True, context={'archive': archive})
        channel_serializer.is_valid(raise_exception=True)
        channels = channel_serializer.save(archive=archive)
        # get messages
        for channel in channels:
            channel_files = [fileinfo for fileinfo in slack_archive.infolist(
            ) if fileinfo.filename.startswith(channel.name)]
            for fileinfo in channel_files:
                if fileinfo.file_size > 0 and fileinfo.filename != 'channels.json':
                    messages_file = slack_archive.open(fileinfo)
                    messages_list = json.load(messages_file)
                    messages_file.close()
                    message_serializer = MessageUploadSerializer(
                        data=messages_list, many=True, context={'archive': archive})
                    message_serializer.is_valid(
                        raise_exception=True)
                    message_serializer.save(channel=channel)
        return file_upload
