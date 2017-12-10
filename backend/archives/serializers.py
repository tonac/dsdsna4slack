import json
import re
import zipfile

from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from archives.models import Archive, SlackUser, Channel, Message, Mention


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

    class Meta:
        model = Archive
        fields = ('id', 'name', 'uploaded', 'channels')


class SlackUserUploadSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=10)
    is_bot = serializers.BooleanField()

    class Meta:
        model = SlackUser
        fields = ('id', 'team_id', 'name', 'is_bot')

    def create(self, validated_data):
        if not validated_data['is_bot']:
            return SlackUser.objects.create(
                slack_id=validated_data['id'],
                team_id=validated_data['team_id'],
                name=validated_data['name'],
                archive=validated_data['archive']
            )
        return None


class SlackUserField(serializers.SlugRelatedField):

    def get_queryset(self):
        archive = self.context['archive']
        queryset = SlackUser.objects.filter(archive=archive)
        return queryset

    def to_internal_value(self, data):
        try:
            return self.get_queryset().get(**{self.slug_field: data})
        except ObjectDoesNotExist:
            return None
        except (TypeError, ValueError):
            self.fail('invalid')


class ChannelUploadSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=10)
    members = SlackUserField(many=True, slug_field='slack_id', allow_null=True)

    class Meta:
        model = Channel
        fields = ('id', 'name', 'members')

    def create(self, validated_data):
        channel = Channel.objects.create(
            channel_id=validated_data['id'],
            name=validated_data['name'],
            archive=validated_data['archive']
        )
        members = [m for m in validated_data['members'] if m is not None]
        channel.members = members
        channel.save()
        return channel


class MessageUploadSerializer(serializers.ModelSerializer):
    user = SlackUserField(many=False, slug_field='slack_id',
                          required=False, allow_null=True)
    ts = serializers.FloatField()

    class Meta:
        model = Message
        fields = ('user', 'text', 'ts')

    def create(self, validated_data):
        # We take only messages with user in account
        if validated_data.get('user') is not None:
            self.get_mentions_from_message(
                validated_data['text'],
                validated_data.get('user'),
                validated_data['archive'],
                validated_data['channel']
            )
            return Message.objects.create(
                slack_user=validated_data.get('user'),
                channel=validated_data['channel'],
                text=validated_data['text'],
                archive=validated_data['archive'],
                ts=timezone.datetime.fromtimestamp(
                    validated_data['ts']).astimezone()
            )

    def get_mentions_from_message(self, text, sender, archive, channel):
        pattern = '<@([A-Z0-9]*)>'
        # TODO: SlackUser can raise error if not in database if not there someone zip is invalid, return input invalid
        for mention_receiver in re.finditer(pattern, text):
            try:
                mention = Mention.objects.get_or_create(
                    archive=archive,
                    mention_sender=sender,
                    mention_receiver=SlackUser.objects.get(
                        archive=archive, slack_id=mention_receiver.group(1)),
                    mention_channel=channel)[0]
                mention.number_of_mentions += 1
                mention.save()
            except ObjectDoesNotExist:
                pass


class FileUploadSerializer(serializers.Serializer):
    datafile = serializers.FileField()

    def validate_datafile(self, value):
        if not zipfile.is_zipfile(value):
            raise serializers.ValidationError("Archive is not a zip file")

        slack_archive = zipfile.ZipFile(value)

        if slack_archive.testzip() is not None:
            raise serializers.ValidationError(
                "Archive is not a valid zip file")
        archive_files = slack_archive.namelist()

        if 'users.json' not in archive_files or 'channels.json' not in archive_files:
            raise serializers.ValidationError(
                "Archive must have users.json and channels.json files")

        return value

    def save_archive(self, archive_zip_file, user):
        archive_serializer = ArchiveSerializer(
            data={'name': archive_zip_file.filename})
        archive_serializer.is_valid(raise_exception=True)
        return archive_serializer.save(user=user)

    def save_users(self, archive_zip_file, archive):
        with archive_zip_file.open('users.json') as users_file:
            slack_user_serializer = SlackUserUploadSerializer(
                data=json.load(users_file), many=True)
        slack_user_serializer.is_valid(raise_exception=True)
        return slack_user_serializer.save(archive=archive)

    def save_channels(self, archive_zip_file, archive):
        with archive_zip_file.open('channels.json') as channels_file:
            channel_serializer = ChannelUploadSerializer(
                data=json.load(channels_file),
                many=True,
                context={'archive': archive}
            )
        channel_serializer.is_valid(raise_exception=True)
        return channel_serializer.save(archive=archive)

    def save_messages(self, archive_zip_file, archive, channels, users):
        for channel in channels:
            pattern = '^%s/[\d]{4}-[\d]{2}-[\d]{2}.json' % channel.name

            for channel_file in filter(lambda file_name: re.match(pattern, file_name), archive_zip_file.namelist()):
                with archive_zip_file.open(channel_file) as messages_file:
                    message_serializer = MessageUploadSerializer(
                        data=json.load(messages_file),
                        many=True,
                        context={'archive': archive, 'users': users}
                    )
                message_serializer.is_valid(raise_exception=True)
                message_serializer.save(
                    archive=archive, channel=channel, users=users)

    def save(self, user):
        with zipfile.ZipFile(self.validated_data['datafile']) as archive_zip_file:
            archive = self.save_archive(archive_zip_file, user)
            users = self.save_users(archive_zip_file, archive)
            channels = self.save_channels(archive_zip_file, archive)
            self.save_messages(archive_zip_file, archive, channels, users)

        return archive
