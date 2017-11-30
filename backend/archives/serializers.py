import json
import zipfile
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
    slackusers = SlackUserSerializer(read_only=True, many=True)

    class Meta:
        model = Archive
        fields = ('id', 'name', 'uploaded', 'channels', 'slackusers')


class SlackUserUploadSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=10)

    class Meta:
        model = SlackUser
        fields = ('id', 'team_id', 'name')

    def create(self, validated_data):
        return SlackUser.objects.create(slack_id=validated_data['id'], team_id=validated_data['team_id'], name=validated_data['name'], archive=validated_data['archive'])


class ChannelUploadSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=10)

    class Meta:
        model = Channel
        fields = ('id', 'name')

    def create(self, validated_data):
        return Channel.objects.create(channel_id=validated_data['id'], name=validated_data['name'], archive=validated_data['archive'])


class MessageUploadSerializer(serializers.ModelSerializer):
    user = serializers.CharField(max_length=10, required=False)

    class Meta:
        model = Message
        fields = ('user', 'text')

    def create(self, validated_data):
        user = validated_data.get("user")
        channel = validated_data['channel']
        slack_user = None
        if user is not None:
            slack_user = SlackUser.objects.get(
                archive=channel.archive, slack_id=user)
        return Message.objects.create(slackuser=slack_user, channel=channel, text=validated_data['text'])


class FileUploadSerializer(serializers.HyperlinkedModelSerializer):

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
                "Archive must have users and channels files")
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
            data=channels_list, many=True)
        channel_serializer.is_valid(raise_exception=True)
        channels = channel_serializer.save(archive=archive)
        print(channels)
        # get messages
        for channel in channels:
            channel_files = [fileinfo for fileinfo in slack_archive.infolist(
            ) if fileinfo.filename.startswith(channel.name)]
            for fileinfo in channel_files:
                if fileinfo.file_size > 0:
                    messages_file = slack_archive.open(fileinfo)
                    messages_list = json.load(messages_file)
                    messages_file.close()
                    message_serializer = MessageUploadSerializer(
                        data=messages_list, many=True)
                    message_serializer.is_valid(
                        raise_exception=True)
                    message_serializer.save(channel=channel)
        return file_upload
