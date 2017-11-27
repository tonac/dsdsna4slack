from rest_framework import serializers
from archives.models import Archive, SlackUser, Channel, Message

class SlackUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = SlackUser
        fields = ('id', 'slack_id', 'name')

class ChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Channel
        fields = ('id', 'channel_id', 'name')

class ArchiveSerializer(serializers.ModelSerializer):
    slackusers = SlackUserSerializer(many=True, required=False)
    channels = ChannelSerializer(many=True, required=False)

    class Meta:
        model = Archive
        fields = ('name', 'uploaded', 'slackusers', 'channels')

class FileSerializer(serializers.Serializer):
    file = serializers.FileField()

    def create(self, validated_data):
        slack_archive = zipfile.ZipFile(file_obj) 
        #slack_archive = zipfile.ZipFile('zip3.zip')
        # check if zip file is valid
        if slack_archive.testzip() is None:
            # search for users.json and channels.json
            archive_files = slack_archive.namelist()
            if 'users.json' in archive_files and 'channels.json' in archive_files:
                # save archive
                #archive_serializer = ArchiveSerializer(data={'name': filename}, context={'request': request})   #
                archive_serializer = ArchiveSerializer(data={'name': slack_archive.filename}, context={'request': request})
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

class SlackUserUploadSerializer(serializers.Serializer):
    user_data = serializers.JSONField()
    archive = ArchiveSerializer(required=False)

    def create(self, validated_data):
        archive = validated_data['archive']
        validated_data = validated_data.pop('user_data')
        return SlackUser.objects.create(slack_id=validated_data['id'], team_id=validated_data['team_id'], name=validated_data['name'], archive=archive)


class ChannelUploadSerializer(serializers.Serializer):
    channel_data = serializers.JSONField()
    archive = ArchiveSerializer(required=False)

    def create(self, validated_data):
        archive = validated_data['archive']
        validated_data = validated_data.pop('channel_data')
        return Channel.objects.create(channel_id=validated_data['id'], name=validated_data['name'], archive=archive)


class MessageUploadSerializer(serializers.Serializer):
    message_data = serializers.JSONField()
    channel = ChannelSerializer(required=False)

    def create(self, validated_data):
        channel = validated_data['channel']
        validated_data = validated_data.pop('message_data')
        user = validated_data.get("user")
        slack_user = None
        if user is not None:
            slack_user = SlackUser.objects.get(
                archive=channel.archive, slack_id=user)
        return Message.objects.create(slackuser=slack_user, channel=channel, text=validated_data['text'])
