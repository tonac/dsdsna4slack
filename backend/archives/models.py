from django.db import models
from django.contrib.auth.models import User


class FileUpload(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    datafile = models.FileField()


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
    #deleted = models.BooleanField()
    #color = models.CharField(max_length=7)
    #real_name = models.CharField(max_length=100)
    ##tz = models.CharField(max_length=100)
    ##tz_label = models.CharField(max_length=100)
    ##tz_offset = models.IntegerField()
    # profile not entered
    #is_admin = models.BooleanField()
    #is_owner = models.BooleanField()
    #is_primary_owner = models.BooleanField()
    #is_restricted = models.BooleanField()
    #is_ultra_restricted = models.BooleanField()
    #is_bot = models.BooleanField()
    #updated = models.DateTimeField(default=datetime.now())
    #is_app_user = models.BooleanField()
    # image
    archive = models.ForeignKey(
        Archive, related_name='slackusers', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )


class Channel(models.Model):
    channel_id = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    #created = models.DateTimeField(default=datetime.now())
    # creator = models.ForeignKey(
    #    SlackUser,
    #    on_delete=models.SET_NULL,
    #    null = True,
    #    related_name='creator')
    #is_archived = models.BooleanField()
    #is_general = models.BooleanField()
    # members = models.ManyToManyField(
    #    SlackUser,
    #    through = 'Channel_SlackUser',
    #    through_fields = ('channel_id', 'slack_user_id'),
    #    related_name = 'member',
    #)
    #topic = JSONField()
    #purpose = JSONField()
    archive = models.ForeignKey(
        Archive, related_name='channels', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )

# class Channel_SlackUser(models.Model):
#    channel_id = models.ForeignKey(Channel, on_delete=models.CASCADE)
#    slack_user_id = models.ForeignKey(SlackUser, on_delete=models.CASCADE)


class Message(models.Model):
    channel = models.ForeignKey(
        Channel, related_name='messages', on_delete=models.CASCADE)
    slackuser = models.ForeignKey(
        SlackUser, related_name='messages', on_delete=models.CASCADE, null=True)
    text = models.TextField(blank=True)
    #ts = models.DateTimeField()

    def __str__(self):
        return self.text

    # class Meta:
    #    ordering = ('ts', )
