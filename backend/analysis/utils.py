from itertools import permutations

import networkx as nx

from archive.models import Mention, SlackUser, Channel


def create_mention_graph(archive, channels):
    graph = nx.Graph()

    # For each user create node
    graph.add_nodes_from(SlackUser.objects.filter(archive=archive))
    for sender, receiver in permutations(SlackUser.objects.filter(archive=archive), 2):

        # Get number of mentions between each users
        number_of_mentions = Mention.objects.filter(
            archive=archive,
            mention_sender=sender,
            mention_receiver=receiver,
            mention_channel__in=channels
        ).count()

        # If there is some mentions between users create edge
        if number_of_mentions > 0:
            graph.add_edge(sender, receiver, weight=number_of_mentions)

    return graph


def create_subscription_graph(archive, channels):
    graph = nx.Graph()

    # Put all channels and users as nodes
    graph.add_nodes_from(SlackUser.objects.filter(archive=archive), bipartite=0)
    graph.add_nodes_from(channels, bipartite=1)

    for channel in channels:
        for member in channel.members.all():
            graph.add_edge(member, channel)

    return graph


def calculate_density(graph):
    if nx.is_bipartite(graph):
        user_nodes = set(n for n, d in graph.nodes(data=True) if d['bipartite'] == 0)
        # In our graphs it is the same if we calculate density on user or channel nodes because they are symmetric
        return nx.algorithms.bipartite.density(graph, user_nodes)
    else:
        return nx.density(graph)
