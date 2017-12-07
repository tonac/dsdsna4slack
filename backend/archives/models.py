from django.contrib.auth.models import User
from django.db import models


class Archive(models.Model):
    name = models.CharField(max_length=100)
    uploaded = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('-uploaded',)


class SlackUser(models.Model):
    slack_id = models.CharField(max_length=10)
    team_id = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    real_name = models.CharField(max_length=100)
    archive = models.ForeignKey(Archive, related_name='slack_users', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)


class Channel(models.Model):
    channel_id = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(SlackUser, related_name='member')
    archive = models.ForeignKey(Archive, related_name='channels', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)


class Mention(models.Model):
    archive = models.ForeignKey(Archive, related_name='mention', on_delete=models.CASCADE)
    mention_sender = models.ForeignKey(SlackUser, related_name='mention_sender', on_delete=models.CASCADE)
    mention_receiver = models.ForeignKey(SlackUser, related_name='mention_receiver', on_delete=models.CASCADE)
    mention_channel = models.ForeignKey(Channel, related_name='mention', on_delete=models.CASCADE)
    number_of_mentions = models.IntegerField(default=0)

    def __str__(self):
        return '{} mentioned {} {} times in {} channel'.format(
            self.mention_sender.name,
            self.mention_receiver.name,
            self.number_of_mentions,
            self.mention_channel.name
        )


class Message(models.Model):
    archive = models.ForeignKey(Archive, related_name='messages', on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, related_name='messages', on_delete=models.CASCADE)
    slack_user = models.ForeignKey(SlackUser, related_name='messages', on_delete=models.CASCADE, null=True)
    text = models.TextField(blank=True, null=True)
    ts = models.DateTimeField()

    def __str__(self):
        return '{} is sent by {} in {}'.format(self.text, self.slack_user.name, self.channel.name)
