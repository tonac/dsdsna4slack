from django.contrib.postgres.fields import JSONField
from django.db import models

from archive.models import Archive, Channel


class MetricsBaseClass(models.Model):
    archive = models.ForeignKey(Archive, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)
    json_graph = JSONField()

    class Meta:
        abstract = True


class OverallMention(MetricsBaseClass):
    density = models.FloatField(blank=False)
    path_length = models.FloatField(blank=False)
    edge_connectivity = models.FloatField(blank=False)
    node_connectivity = models.FloatField(blank=False)
    channels = models.ManyToManyField(Channel, related_name='channel_mention_analysed')


class OverallSubscription(MetricsBaseClass):
    density = models.FloatField(blank=False)
    path_length = models.FloatField(blank=False)
    edge_connectivity = models.FloatField(blank=False)
    node_connectivity = models.FloatField(blank=False)
    channels = models.ManyToManyField(Channel, related_name='channel_subscription_analysed')
