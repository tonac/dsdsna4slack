from rest_framework import serializers
from archives.models import Archive, SlackUser, Channel, Message

class ArchiveSerializer(serializers.HyperlinkedModelSerializer):
    slackusers = serializers.HyperlinkedRelatedField(read_only=True, view_name='slackuser-detail', many=True)
    channels = serializers.HyperlinkedRelatedField(read_only=True, view_name='channel-detail', many=True)
    class Meta:
        model = Archive
        fields = ('url', 'name', 'uploaded', 'slackusers', 'channels')

class SlackUserSerializer(serializers.HyperlinkedModelSerializer):
    archive = serializers.HyperlinkedRelatedField(read_only=True, view_name='archive-detail')
    class Meta:
        model = SlackUser
        fields = ('url', 'slack_id', 'name', 'archive')

class ChannelSerializer(serializers.HyperlinkedModelSerializer):
    archive = serializers.HyperlinkedRelatedField(read_only=True, view_name='archive-detail')
    messages = serializers.HyperlinkedRelatedField(read_only=True, view_name='message-detail', many=True)
    class Meta:
        model = Channel
        fields = ('url', 'channel_id', 'name', 'messages','archive')

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    channel = serializers.HyperlinkedRelatedField(read_only=True, view_name='channel-detail')
    slackuser = serializers.HyperlinkedRelatedField(read_only=True, view_name='slackuser-detail')
    class Meta:
        model = Message
        fields = ('url', 'slackuser', 'channel', 'text')

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
        return Channel.objects.create(channel_id= validated_data['id'], name=validated_data['name'], archive=archive)

class MessageUploadSerializer(serializers.Serializer):
    message_data = serializers.JSONField()
    channel = ChannelSerializer(required=False)

    def create(self, validated_data):
        channel = validated_data['channel']
        validated_data = validated_data.pop('message_data')
        user = validated_data.get("user")
        slack_user = None
        if user is not None:
            slack_user = SlackUser.objects.get(archive=channel.archive, slack_id=user)
        return Message.objects.create(slackuser=slack_user, channel=channel, text=validated_data['text'])
