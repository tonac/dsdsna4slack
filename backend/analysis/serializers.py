from rest_framework import serializers

from analysis.models import OverallSubscription
from analysis.utils import create_subscription_graph, calculate_density, calculate_average_path_length, \
    calculate_edge_connectivity, calculate_node_connectivity
from archive.serializers import Archive


class OverallSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OverallSubscription
        exclude = ('channels',)


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
            # TODO: limit visible channels to just ones that are users
            # self.fields['channels'] = serializers.ManyRelatedField(
            #     queryset=Channel.objects.filter(archive__user=self.context['request'].user))

    def check_if_already_exist(self, archive, channels):
        analysis = OverallSubscription.objects.filter(archive=archive, channels__in=channels)
        if analysis:
            return analysis[0]

    def save(self, archive, channels):
        result = self.check_if_already_exist(archive, channels)
        if result:
            return OverallSubscriptionSerializer(result).data

        graph, dict_graph = create_subscription_graph(archive, channels)
        # graph, dict_graph = create_subscription_graph(validated_data['archive'], validated_data['channels'])

        overall_subscription = OverallSubscription.objects.create(
            archive=archive,
            # archive=validated_data['archive'],
            density=calculate_density(graph),
            path_length=calculate_average_path_length(graph),
            node_connectivity=calculate_node_connectivity(graph),
            edge_connectivity=calculate_edge_connectivity(graph),
            json_graph=dict_graph
        )
        # overall_subscription.channels = validated_data['channels']
        overall_subscription.channels = channels
        overall_subscription.save()

        return OverallSubscriptionSerializer(overall_subscription).data

# class OverallMentionMetricsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OverallMention
#         exclude = ('channels',)
