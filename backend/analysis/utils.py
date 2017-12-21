from itertools import permutations, combinations

import networkx as nx
from django.db.models import Sum

from archive.models import Mention, SlackUser


def create_mention_graph(archive, channels):
    graph = nx.Graph()
    mentions = []

    # For each user create node
    users = SlackUser.objects.filter(archive=archive)

    graph.add_nodes_from(users)
    for sender, receiver in permutations(users, 2):

        # Get number of mentions between each users
        number_of_mentions = Mention.objects.filter(
            archive=archive,
            mention_sender=sender,
            mention_receiver=receiver,
            mention_channel__in=channels
        ).aggregate(Sum('number_of_mentions'))['number_of_mentions__sum']

        # If there is some mentions between users create edge
        if number_of_mentions:
            graph.add_edge(sender, receiver, weight=number_of_mentions)
            mentions.append({'sender_id': sender.id, 'receiver_id': receiver.id, 'mentions': number_of_mentions})

    dictionary_graph = {
        'users': list(users.values('id', 'real_name')),
        'mentions': mentions,
    }

    return graph, dictionary_graph


def create_subscription_graph(archive, channels):
    graph = nx.Graph()

    # Put all channels and users as nodes
    users = SlackUser.objects.filter(archive=archive)

    graph.add_nodes_from(users, bipartite=0)
    graph.add_nodes_from(channels, bipartite=1)

    channels_info = []
    sent_messages_info = []
    for channel in channels:
        channels_info.append({'id': channel.id, 'name': channel.name})
        for member in channel.members.all():
            sent_messages = channel.messages.filter(slack_user=member).count()
            graph.add_edge(member, channel, weight=sent_messages)
            sent_messages_info.append({'channel_id': channel.id, 'user_id': member.id, 'messages': sent_messages})

    dictionary_graph = {
        'users': list(users.values('id', 'real_name')),
        'channels': channels_info,
        'sent_messages': sent_messages_info
    }

    return graph, dictionary_graph


def calculate_density(graph, graph_type):
    if graph_type == 'subscription':
        user_nodes = set(n for n, d in graph.nodes(data=True) if d.get('bipartite') == 0)
        # In our graphs it is the same if we calculate density on user or channel nodes because they are symmetric
        return nx.algorithms.bipartite.density(graph, user_nodes)
    elif graph_type == 'mention':
        return nx.density(graph)


def calculate_average_path_length(graph, graph_type):
    if graph_type == 'subscription':
        user_nodes = set(n for n, d in graph.nodes(data=True) if d.get('bipartite') == 0)
        sum_of_lengths = 0
        for start, end in combinations(user_nodes, 2):
            try:
                sum_of_lengths += nx.shortest_path_length(graph, source=start, target=end)
            except (nx.exception.NetworkXNoPath, nx.exception.NetworkXError):
                return 0

        return sum_of_lengths / ((len(user_nodes) * len(user_nodes) - 1) / 2)

    elif graph_type == 'mention':
        try:
            return nx.average_shortest_path_length(graph)
        except (nx.exception.NetworkXNoPath, nx.exception.NetworkXError):
            return 0


def calculate_edge_connectivity(graph, graph_type):
    if graph_type == 'subscription':
        user_nodes = set(n for n, d in graph.nodes(data=True) if d.get('bipartite') == 0)
        results = [nx.edge_connectivity(graph, s=start, t=end) for start, end in combinations(user_nodes, 2)]
        return min(results) if results else 0

    elif graph_type == 'mention':
        return nx.edge_connectivity(graph)


def calculate_node_connectivity(graph, graph_type):
    if graph_type == 'subscription':
        user_nodes = set(n for n, d in graph.nodes(data=True) if d.get('bipartite') == 0)
        results = [nx.node_connectivity(graph, s=start, t=end) for start, end in combinations(user_nodes, 2)]
        return min(results) if results else 0

    elif graph_type == 'mention':
        return nx.node_connectivity(graph)
