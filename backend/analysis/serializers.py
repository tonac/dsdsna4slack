from rest_framework import serializers

from analysis.models import OverallSubscription
from analysis.utils import create_subscription_graph, calculate_density
from archive.serializers import Archive, Channel

overall_metrics_fields = ('archive', 'density', 'path_length', 'edge_connectivity', 'vertex_connectivity')


class OverallSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OverallSubscription
        fields = overall_metrics_fields


class MakeOverallSubscriptionSerializer(serializers.ModelSerializer):

    def validate(self, data):

        if self.context['request'].user != data['archive'].user:
            raise serializers.ValidationError("User is not owner of the archive")

        for channel in data['channels']:
            if channel.archive != data['archive']:
                raise serializers.ValidationError("Channel is not in given archive")

        return data

    class Meta:
        model = OverallSubscription
        fields = ('archive', 'channels')

    def __init__(self, *args, **kwargs):
        super(MakeOverallSubscriptionSerializer, self).__init__(*args, **kwargs)

        if self.context.get('request'):
            self.fields['archive'] = serializers.PrimaryKeyRelatedField(
                queryset=Archive.objects.filter(user=self.context['request'].user))

    def save(self, **kwargs):
        graph = create_subscription_graph(self._validated_data['archive'], self._validated_data['channels'])
        density = calculate_density(graph)
        print(density)
        return density

# class OverallMentionMetricsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OverallMention
#         fields = overall_metrics_fields

