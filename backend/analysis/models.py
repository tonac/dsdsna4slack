from django.contrib.postgres.fields import JSONField, ArrayField
from django.db import models

from archive.models import Archive, Channel


class OverallMetrics(models.Model):
    SUBSCRIPTION = 'subscription'
    MENTION = 'mention'
    GRAPH_TYPES = ((SUBSCRIPTION, 'subscription'), (MENTION, 'mention'))

    archive = models.ForeignKey(Archive, on_delete=models.CASCADE)
    public = models.BooleanField(default=False)
    json_graph = JSONField()
    density = models.FloatField(blank=False)
    path_length = models.FloatField(blank=False)
    edge_connectivity = models.FloatField(blank=False)
    node_connectivity = models.FloatField(blank=False)
    average_clustering = models.FloatField(blank=False)
    analysed_channels = ArrayField(models.IntegerField())
    graph_type = models.CharField(max_length=12, choices=GRAPH_TYPES, default=SUBSCRIPTION, blank=False)

    def __str__(self):
        return '{} analysis of {} with {} channels'.format(self.graph_type, self.archive, len(self.analysed_channels))
