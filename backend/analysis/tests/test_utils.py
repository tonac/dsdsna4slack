from django.contrib.auth.models import User
from django.db.models import Sum
from django.test import TestCase
from django.utils.timezone import now

from analysis.utils import create_mention_graph, calculate_node_connectivity, calculate_edge_connectivity, \
    calculate_average_path_length, calculate_density, create_subscription_graph, calculate_average_clustering
from archive.models import Archive, Channel, Mention, Message, SlackUser


class GraphAnalysisTest(TestCase):
    archive = None
    work = None
    work_single_direction = None
    secret = None
    home = None
    shelly = None
    no_message_members = None
    no_members_messages = None
    no_members_no_messages = None
    broken_phone = None
    chain_channel_a = None
    chain_channel_b = None
    chain_channel_c = None
    chain_channel_d = None
    users = []

    @classmethod
    def create_slack_users(cls):
        howard = SlackUser.objects.create(name='Howard', real_name='Howard Wolowitz', archive=cls.archive)
        cls.users.append({'id': 1, 'real_name': 'Howard Wolowitz'})
        leonard = SlackUser.objects.create(name='Leonard', real_name='Leonard Hofstadter', archive=cls.archive)
        cls.users.append({'id': 2, 'real_name': 'Leonard Hofstadter'})
        raj = SlackUser.objects.create(name='Raj', real_name='Raj Koothrappali', archive=cls.archive)
        cls.users.append({'id': 3, 'real_name': 'Raj Koothrappali'})
        sheldon = SlackUser.objects.create(name='Sheldon', real_name='Sheldon Cooper', archive=cls.archive)
        cls.users.append({'id': 4, 'real_name': 'Sheldon Cooper'})

        cls.users.sort(key=lambda x: x['real_name'])

        return howard, leonard, raj, sheldon

    @classmethod
    def create_channels(cls):
        cls.work = Channel.objects.create(name='work', archive=cls.archive)
        cls.work_single_direction = Channel.objects.create(name='work_single_direction', archive=cls.archive)
        cls.secret = Channel.objects.create(name='secret', archive=cls.archive)
        cls.home = Channel.objects.create(name='home', archive=cls.archive)
        cls.shelly = Channel.objects.create(name='shelly', archive=cls.archive)
        cls.no_message_members = Channel.objects.create(name='no_message_members', archive=cls.archive)
        cls.no_members_messages = Channel.objects.create(name='no_members_messages', archive=cls.archive)
        cls.no_members_no_messages = Channel.objects.create(name='no_members_no_messages', archive=cls.archive)
        cls.broken_phone = Channel.objects.create(name='broken_phone', archive=cls.archive)
        cls.chain_channel_a = Channel.objects.create(name='chain_channel_a', archive=cls.archive)
        cls.chain_channel_b = Channel.objects.create(name='chain_channel_b', archive=cls.archive)
        cls.chain_channel_c = Channel.objects.create(name='chain_channel_c', archive=cls.archive)
        cls.chain_channel_d = Channel.objects.create(name='chain_channel_d', archive=cls.archive)

    @classmethod
    def add_users_to_channels(cls, howard, leonard, raj, sheldon):
        cls.work.members.add(howard, leonard, raj, sheldon)
        cls.work_single_direction.members.add(howard, leonard, raj, sheldon)
        cls.secret.members.add(leonard, howard, raj)
        cls.home.members.add(leonard, sheldon)
        cls.shelly.members.add(sheldon)
        cls.no_message_members.members.add(sheldon, raj)
        cls.broken_phone.members.add(howard, leonard, raj, sheldon)
        cls.chain_channel_a.members.add(howard, leonard)
        cls.chain_channel_b.members.add(leonard, raj)
        cls.chain_channel_c.members.add(raj, sheldon)
        cls.chain_channel_d.members.add(sheldon, howard)

    @classmethod
    def create_messages_in_channel(cls, archive, channel, user):
        Message.objects.create(archive=archive, channel=channel, slack_user=user, text='Some text', ts=now())

    @classmethod
    def add_messages_to_channels(cls, howard, leonard, raj, sheldon):
        for i in range(100):
            cls.create_messages_in_channel(cls.archive, cls.work, leonard)
            cls.create_messages_in_channel(cls.archive, cls.work, sheldon)
            cls.create_messages_in_channel(cls.archive, cls.work, howard)
            cls.create_messages_in_channel(cls.archive, cls.work, raj)

            cls.create_messages_in_channel(cls.archive, cls.work_single_direction, leonard)
            cls.create_messages_in_channel(cls.archive, cls.work_single_direction, sheldon)
            cls.create_messages_in_channel(cls.archive, cls.work_single_direction, howard)
            cls.create_messages_in_channel(cls.archive, cls.work_single_direction, raj)

            cls.create_messages_in_channel(cls.archive, cls.secret, leonard)
            cls.create_messages_in_channel(cls.archive, cls.secret, howard)

            cls.create_messages_in_channel(cls.archive, cls.home, leonard)
            cls.create_messages_in_channel(cls.archive, cls.home, sheldon)
            cls.create_messages_in_channel(cls.archive, cls.home, sheldon)

            cls.create_messages_in_channel(cls.archive, cls.shelly, sheldon)

            cls.create_messages_in_channel(cls.archive, cls.no_members_messages, leonard)
            cls.create_messages_in_channel(cls.archive, cls.no_members_messages, sheldon)
            cls.create_messages_in_channel(cls.archive, cls.no_members_messages, howard)
            cls.create_messages_in_channel(cls.archive, cls.no_members_messages, raj)

            cls.create_messages_in_channel(cls.archive, cls.broken_phone, leonard)
            cls.create_messages_in_channel(cls.archive, cls.broken_phone, howard)
            cls.create_messages_in_channel(cls.archive, cls.broken_phone, raj)

    @classmethod
    def create_mentions_in_channel(cls, archive, channel, sender, receiver, number_of_mentions):
        Mention.objects.create(
            archive=archive,
            mention_sender=sender,
            mention_receiver=receiver,
            mention_channel=channel,
            number_of_mentions=number_of_mentions
        )

    @classmethod
    def add_mentions_to_channel_work(cls, howard, leonard, raj, sheldon):
        cls.create_mentions_in_channel(cls.archive, cls.work, leonard, sheldon, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work, leonard, howard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work, leonard, raj, 10)

        cls.create_mentions_in_channel(cls.archive, cls.work, sheldon, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work, sheldon, howard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work, sheldon, raj, 10)

        cls.create_mentions_in_channel(cls.archive, cls.work, howard, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work, howard, sheldon, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work, howard, raj, 10)

        cls.create_mentions_in_channel(cls.archive, cls.work, raj, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work, raj, sheldon, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work, raj, howard, 10)

    @classmethod
    def add_mentions_to_channel_work_single_direction(cls, howard, leonard, raj, sheldon):
        cls.create_mentions_in_channel(cls.archive, cls.work_single_direction, sheldon, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work_single_direction, sheldon, howard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work_single_direction, sheldon, raj, 10)

        cls.create_mentions_in_channel(cls.archive, cls.work_single_direction, howard, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work_single_direction, leonard, raj, 10)
        cls.create_mentions_in_channel(cls.archive, cls.work_single_direction, raj, howard, 10)

    @classmethod
    def add_mentions_to_channel_secret(cls, howard, leonard, raj):
        cls.create_mentions_in_channel(cls.archive, cls.secret, leonard, howard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.secret, leonard, raj, 10)

        cls.create_mentions_in_channel(cls.archive, cls.secret, howard, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.secret, howard, raj, 10)

        cls.create_mentions_in_channel(cls.archive, cls.secret, raj, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.secret, raj, howard, 10)

    @classmethod
    def add_mentions_to_channel_home(cls, leonard, sheldon):
        cls.create_mentions_in_channel(cls.archive, cls.home, leonard, sheldon, 10)
        cls.create_mentions_in_channel(cls.archive, cls.home, sheldon, leonard, 10)

    @classmethod
    def add_mentions_to_channel_shelly(cls, howard, leonard, raj, sheldon):
        cls.create_mentions_in_channel(cls.archive, cls.shelly, sheldon, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.shelly, sheldon, sheldon, 10)
        cls.create_mentions_in_channel(cls.archive, cls.shelly, sheldon, howard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.shelly, sheldon, raj, 10)

    @classmethod
    def add_mentions_to_channel_no_members_messages(cls, howard, leonard, raj, sheldon):
        cls.create_mentions_in_channel(cls.archive, cls.no_members_messages, howard, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.no_members_messages, leonard, raj, 10)
        cls.create_mentions_in_channel(cls.archive, cls.no_members_messages, raj, sheldon, 10)
        cls.create_mentions_in_channel(cls.archive, cls.no_members_messages, sheldon, howard, 10)

    @classmethod
    def add_mentions_to_channel_broken_phone(cls, howard, leonard, raj, sheldon):
        cls.create_mentions_in_channel(cls.archive, cls.broken_phone, howard, leonard, 10)
        cls.create_mentions_in_channel(cls.archive, cls.broken_phone, leonard, raj, 10)
        cls.create_mentions_in_channel(cls.archive, cls.broken_phone, raj, sheldon, 10)

    @classmethod
    def add_mentions_to_channels(cls, howard, leonard, raj, sheldon):
        cls.add_mentions_to_channel_work(howard, leonard, raj, sheldon)
        cls.add_mentions_to_channel_work_single_direction(howard, leonard, raj, sheldon)
        cls.add_mentions_to_channel_secret(howard, leonard, raj)
        cls.add_mentions_to_channel_home(leonard, sheldon)
        cls.add_mentions_to_channel_shelly(howard, leonard, raj, sheldon)
        cls.add_mentions_to_channel_no_members_messages(howard, leonard, raj, sheldon)
        cls.add_mentions_to_channel_broken_phone(howard, leonard, raj, sheldon)

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(first_name='Leonard', last_name='Hofstadter', username='leonard')
        cls.archive = Archive.objects.create(name='Season 1', user=cls.user)

        howard, leonard, raj, sheldon = cls.create_slack_users()
        cls.create_channels()
        cls.add_users_to_channels(howard, leonard, raj, sheldon)
        cls.add_messages_to_channels(howard, leonard, raj, sheldon)
        cls.add_mentions_to_channels(howard, leonard, raj, sheldon)

    def test_data_loading(self):
        """
        Tests loading data. If data loaded in setUpTestData changes,
        this test probably all remaining tests in this class should be changed also.
        """
        archives = Archive.objects.all()

        self.assertEqual(len(archives), 1), 'Should be just one archive'
        self.assertEqual(self.archive, archives[0]), 'Should be just one archive'

        all_channels = [self.home, self.no_members_messages, self.no_members_no_messages, self.no_message_members,
                        self.secret, self.shelly, self.work, self.work_single_direction, self.broken_phone,
                        self.chain_channel_a, self.chain_channel_b, self.chain_channel_c, self.chain_channel_d]
        self.assertQuerysetEqual(Channel.objects.all(), map(repr, all_channels), ordered=False, msg='Channels missing')

        self.assertEqual(SlackUser.objects.count(), 4, 'There should be 4 slack users')

        self.assertEqual(Message.objects.count(), 2100, 'There should be 2100 messages slack users sent')

        mentions = Mention.objects.all()
        self.assertEqual(mentions.count(), 37), 'There should be 37 mentions between users in different channels'
        number_of_mentions = mentions.aggregate(Sum('number_of_mentions'))['number_of_mentions__sum']
        self.assertEqual(number_of_mentions, 370), 'There should be 370 mentions in total'

    def test_mention_graph_no_mentions(self):
        """Tests mention graph when in selected channels there are no mentions between users."""
        graph_type = 'mention'
        graph, graph_dict = create_mention_graph(self.archive, [self.no_message_members, self.no_members_no_messages])

        clustering = [
            {'clustering': 0, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 0, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 0, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering, 'Clustering is not as expected')
        self.assertEqual(graph_dict['mentions'], [], 'There should be no mentions')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_density(graph, graph_type), 0, 'No connection should yield 0')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 0, 'On not connected graph should be 0')

    def test_mention_graph_chain(self):
        """Test mention graph when in selected channels users mentioned form linked chain. e.g. A-B-C-D"""
        graph_type = 'mention'
        graph, graph_dict = create_mention_graph(self.archive, [self.broken_phone])

        clustering = [
            {'clustering': 0, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 0, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 0, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering, 'Clustering is not as expected')

        mentions = [
            {'mentions': 10, 'sender_id': 1, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 3},
            {'mentions': 10, 'sender_id': 3, 'receiver_id': 4},
        ]
        self.assertEqual(sorted(graph_dict['mentions'], key=lambda x: x['sender_id']), mentions,
                         'Mentions are not like in loaded data')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 20 / 12,
                         'Paths ((1+2+3)*2 + (1+1+2)*2) / 12')
        self.assertEqual(calculate_density(graph, graph_type), 1 / 2, 'All current / possible connections, 3 / 6')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 1, 'Remove >= 1 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 1, 'Remove >= 1 nodes, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 0, 'No neighbours of each node are connected')

    def test_mention_graph_circular(self):
        """
        Tests mention graph when in selected channels users mention one another can be spread in circle.
        Mentions are spread so every user mentions exactly one other user that nobody else is mentioning.
        All users participate in mentions so there is nobody left out (graph is connected). A-B-C-D-A
        """
        graph_type = 'mention'
        graph, graph_dict = create_mention_graph(self.archive, [self.no_members_messages])

        clustering = [
            {'clustering': 0, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 0, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 0, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering, 'Clustering is not as expected')

        mentions = [
            {'mentions': 10, 'sender_id': 1, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 3},
            {'mentions': 10, 'sender_id': 3, 'receiver_id': 4},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 1},
        ]
        self.assertEqual(sorted(graph_dict['mentions'], key=lambda x: x['sender_id']), mentions,
                         'Mentions are not like in loaded data')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 4 / 3, 'Paths (1+2+1)/3 + symmetrical graph')
        self.assertEqual(calculate_density(graph, graph_type), 4 / 6, 'All current / possible connections, 4 / 6')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 2, 'Remove >= 2 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 2, 'Remove >= 2 nodes, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 0, 'No neighbours of each node are connected')

    def test_mention_graph_center_node(self):
        """Tests mention graph when there is center node through which all other nodes are connected. A-C B-C D-C"""
        graph_type = 'mention'
        graph, graph_dict = create_mention_graph(self.archive, [self.shelly])

        clustering = [
            {'clustering': 0, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 0, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 0, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering, 'Clustering is not as expected')

        mentions = [
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 1},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 3},
        ]
        self.assertEqual(sorted(graph_dict['mentions'], key=lambda x: x['receiver_id']), mentions,
                         'Mentions are not like in loaded data')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 18 / 12,
                         'Paths go through central node, 3*(1+2+2) + (1+1+1) divided by number of paths 4*3')
        self.assertEqual(calculate_density(graph, graph_type), 3 / 6, 'All current / possible connections, 3 / 6')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 1, 'Remove >= 1 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 1, 'Remove >= 1 edges, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 0, 'No neighbours of each node are connected')

    def test_mention_graph_one_not_connected_node(self):
        """Tests mention graph when there one node not connected to the graph. A-B-C-A D"""
        graph_type = 'mention'
        graph, graph_dict = create_mention_graph(self.archive, [self.secret])

        clustering = [
            {'clustering': 1, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 1, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 1, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering, 'Clustering is not as expected')

        mentions = [
            {'mentions': 10, 'sender_id': 1, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 1, 'receiver_id': 3},
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 1},
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 3},
            {'mentions': 10, 'sender_id': 3, 'receiver_id': 1},
            {'mentions': 10, 'sender_id': 3, 'receiver_id': 2},
        ]
        self.assertEqual(sorted(graph_dict['mentions'], key=lambda x: x['sender_id']), mentions,
                         'Mentions are not like in loaded data')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_density(graph, graph_type), 3 / 6, 'All current / possible connections, 3 / 6')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 3 / 4, '3 nodes has connected neighbours')

    def test_mention_graph_two_connected_nodes(self):
        """
        Tests mention graph when there are 2 nodes connected in both directions. A-B B-A.
        Currently using mention graph as non directed graph so should be the same as A-B
        """
        graph_type = 'mention'
        graph, graph_dict = create_mention_graph(self.archive, [self.home])

        clustering = [
            {'clustering': 0, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 0, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 0, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering, 'Clustering is not as expected')

        mentions = [
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 4},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 2},
        ]
        self.assertEqual(sorted(graph_dict['mentions'], key=lambda x: x['sender_id']), mentions,
                         'Mentions are not like in loaded data')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_density(graph, graph_type), 1 / 6, 'All current / possible connections, 1 / 6')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 0, 'No neighbours of each node are connected')

    def test_mention_graph_all_nodes_connected_to_each_other(self):
        """Tests mention graph when there are all nodes interconnected in both directions. A-B A-C A-D B-C B-D C-D."""
        graph_type = 'mention'
        graph, graph_dict = create_mention_graph(self.archive, [self.work])

        clustering = [
            {'clustering': 1, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 1, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 1, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 1, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering, 'Clustering is not as expected')

        mentions = [
            {'mentions': 10, 'sender_id': 1, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 1, 'receiver_id': 3},
            {'mentions': 10, 'sender_id': 1, 'receiver_id': 4},
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 1},
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 3},
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 4},
            {'mentions': 10, 'sender_id': 3, 'receiver_id': 1},
            {'mentions': 10, 'sender_id': 3, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 3, 'receiver_id': 4},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 1},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 3},
        ]
        self.assertEqual(sorted(graph_dict['mentions'], key=lambda x: x['sender_id']), mentions,
                         'Mentions are not like in loaded data')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 1,
                         'There should be path between each node pairs')
        self.assertEqual(calculate_density(graph, graph_type), 1, 'All possible connections should be on the graph')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 3, 'Remove >= 3 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 3, 'Remove >= 3 edges, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 1, 'All nodes has connected neighbours')

    def test_mention_graph_fewest_edges_interconnected_graph(self):
        """
        Tests mention graph when there are all nodes interconnected in just one directions.
        Every node has path of length 1 to all other nodes (not looking direction).
        Graph with fewest edges with that property. A->B A->C A->D B->C C->D.
        """
        graph_type = 'mention'
        graph, graph_dict = create_mention_graph(self.archive, [self.work_single_direction])

        clustering = [
            {'clustering': 1, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 1, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 1, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 1, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering, 'Clustering is not as expected')

        mentions = [
            {'mentions': 10, 'sender_id': 1, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 2, 'receiver_id': 3},
            {'mentions': 10, 'sender_id': 3, 'receiver_id': 1},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 1},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 2},
            {'mentions': 10, 'sender_id': 4, 'receiver_id': 3},
        ]
        self.assertEqual(sorted(graph_dict['mentions'], key=lambda x: x['sender_id']), mentions,
                         'Mentions are not like in loaded data')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 1,
                         'There should be path between each node pairs')
        self.assertEqual(calculate_density(graph, graph_type), 1, 'All possible connections should be on the graph')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 3, 'Remove >= 3 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 3, 'Remove >= 3 edges, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 1, 'All nodes neighbours are connected')

    def test_subscription_graph_no_subscriptions(self):
        """Tests subscription graph when in selected channels there are no users subscribed to them."""
        graph_type = 'subscription'
        graph, graph_dict = create_subscription_graph(self.archive,
                                                      [self.no_members_messages, self.no_members_no_messages])

        clustering_users = [
            {'clustering': 0, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 0, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 0, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering_users, 'Clustering is not as expected')

        clustering_channels = [
            {'clustering': 0, 'id': 7, 'name': 'no_members_messages'},
            {'clustering': 0, 'id': 8, 'name': 'no_members_no_messages'},
        ]
        self.assertEqual(graph_dict['channels'], clustering_channels, 'Clustering is not as expected')

        self.assertEqual(graph_dict['sent_messages'], [], 'There should empty list, no users are subscribed')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_density(graph, graph_type), 0, 'No connection should yield 0')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 0, 'None nodes are connected')

    def test_subscription_graph_one_subscriber(self):
        """Tests subscription graph when in selected channel there is just one user subscribed to it."""
        graph_type = 'subscription'
        graph, graph_dict = create_subscription_graph(self.archive, [self.shelly])

        clustering_users = [
            {'clustering': 0, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 0, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 0, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering_users, 'Clustering is not as expected')

        clustering_channels = [
            {'clustering': 0, 'id': 5, 'name': 'shelly'},
        ]
        self.assertEqual(graph_dict['channels'], clustering_channels, 'Clustering is not as expected')

        sent_messages = [{'messages': 100, 'user_id': 4, 'channel_id': self.shelly.id}]
        self.assertEqual(graph_dict['sent_messages'], sent_messages, 'There should just messages from one user')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_density(graph, graph_type), 1 / 4, 'Just 1 of 4 possible connections')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 0, 'No neighbours are connected')

    def test_subscription_graph_one_not_subscribed(self):
        """
        Tests subscription graph when in selected channel there is just one user not subscribed to it.
        Testing also what happen when user is subscribed and she didn't send any messages.
        """
        graph_type = 'subscription'
        graph, graph_dict = create_subscription_graph(self.archive, [self.secret])

        clustering_users = [
            {'clustering': 1, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 1, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 1, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 0, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering_users, 'Clustering is not as expected')

        clustering_channels = [
            {'clustering': 0, 'id': 3, 'name': 'secret'},
        ]
        self.assertEqual(graph_dict['channels'], clustering_channels, 'Clustering is not as expected')

        sent_messages = [
            {'messages': 100, 'user_id': 1, 'channel_id': self.secret.id},
            {'messages': 100, 'user_id': 2, 'channel_id': self.secret.id},
            {'messages': 0, 'user_id': 3, 'channel_id': self.secret.id},
        ]
        self.assertEqual(sorted(graph_dict['sent_messages'], key=lambda x: x['user_id']), sent_messages,
                         'Check sorting first if lists length is the same')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_density(graph, graph_type), 3 / 4, 'Just 3 of 4 possible connections')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 0, 'On not connected graph should be 0')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 3 / 5)

    def test_subscription_graph_all_subscribed_one_channel(self):
        """Tests subscription graph when in selected channel all users are subscribed to it."""
        graph_type = 'subscription'
        graph, graph_dict = create_subscription_graph(self.archive, [self.work])

        clustering_users = [
            {'clustering': 1, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 1, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 1, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 1, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering_users, 'Clustering is not as expected')

        clustering_channels = [
            {'clustering': 0, 'id': 1, 'name': 'work'},
        ]
        self.assertEqual(graph_dict['channels'], clustering_channels, 'Clustering is not as expected')

        sent_messages = [
            {'messages': 100, 'user_id': 1, 'channel_id': self.work.id},
            {'messages': 100, 'user_id': 2, 'channel_id': self.work.id},
            {'messages': 100, 'user_id': 3, 'channel_id': self.work.id},
            {'messages': 100, 'user_id': 4, 'channel_id': self.work.id},
        ]
        self.assertEqual(sorted(graph_dict['sent_messages'], key=lambda x: x['user_id']), sent_messages,
                         'Check sorting first if lists length is the same')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 2, 'On not connected graph should be 0')
        self.assertEqual(calculate_density(graph, graph_type), 1, 'All users should be subscribed to channel')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 1, 'Remove >= 1 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 1, 'Remove >= 1 edges, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 4 / 5)

    def test_subscription_graph_chain(self):
        """
        Tests subscription graph when in selected channels users are connected in open chain.
        Howard-A-Leonard-B-Raj-C-Sheldon
        """
        graph_type = 'subscription'
        graph, graph_dict = create_subscription_graph(self.archive, [self.chain_channel_a, self.chain_channel_b,
                                                                     self.chain_channel_c])

        clustering_users = [
            {'clustering': 1 / 2, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': (1 / 2 + 1 / 3) / 2, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': (1 / 2 + 1 / 3) / 2, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 1 / 2, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering_users, 'Clustering is not as expected')

        clustering_channels = [
            {'clustering': 1 / 3, 'id': 10, 'name': 'chain_channel_a'},
            {'clustering': 1 / 3, 'id': 11, 'name': 'chain_channel_b'},
            {'clustering': 1 / 3, 'id': 12, 'name': 'chain_channel_c'},
        ]
        self.assertEqual(graph_dict['channels'], clustering_channels, 'Clustering is not as expected')

        sent_messages = [
            {'messages': 0, 'user_id': 1, 'channel_id': self.chain_channel_a.id},
            {'messages': 0, 'user_id': 2, 'channel_id': self.chain_channel_a.id},
            {'messages': 0, 'user_id': 2, 'channel_id': self.chain_channel_b.id},
            {'messages': 0, 'user_id': 3, 'channel_id': self.chain_channel_b.id},
            {'messages': 0, 'user_id': 3, 'channel_id': self.chain_channel_c.id},
            {'messages': 0, 'user_id': 4, 'channel_id': self.chain_channel_c.id},
        ]
        self.assertEqual(sorted(graph_dict['sent_messages'], key=lambda x: x['user_id']), sent_messages,
                         'Check sorting first if lists length is the same')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 20 / 6,
                         'Combination of all users pairs path length, (2+4+6+2+4+2)/6')
        self.assertEqual(calculate_density(graph, graph_type), 6 / 12, 'On each of 3 channels, 2 of possible 4 users')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 1, 'Remove >= 1 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 1, 'Remove >= 1 edges, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 34 / 84)


    def test_subscription_graph_circle(self):
        """
        Tests subscription graph when in selected channels users are connected in circle.
        Howard-A-Leonard-B-Raj-C-Sheldon-D-Howard
        """
        graph_type = 'subscription'
        graph, graph_dict = create_subscription_graph(self.archive, [self.chain_channel_a, self.chain_channel_b,
                                                                     self.chain_channel_c, self.chain_channel_d])

        clustering_users = [
            {'clustering': 1 / 3, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 1 / 3, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 1 / 3, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 1 / 3, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering_users, 'Clustering is not as expected')

        clustering_channels = [
            {'clustering': 1 / 3, 'id': 10, 'name': 'chain_channel_a'},
            {'clustering': 1 / 3, 'id': 11, 'name': 'chain_channel_b'},
            {'clustering': 1 / 3, 'id': 12, 'name': 'chain_channel_c'},
            {'clustering': 1 / 3, 'id': 13, 'name': 'chain_channel_d'},
        ]
        self.assertEqual(graph_dict['channels'], clustering_channels, 'Clustering is not as expected')

        sent_messages = [
            {'messages': 0, 'user_id': 1, 'channel_id': self.chain_channel_a.id},
            {'messages': 0, 'user_id': 1, 'channel_id': self.chain_channel_d.id},
            {'messages': 0, 'user_id': 2, 'channel_id': self.chain_channel_a.id},
            {'messages': 0, 'user_id': 2, 'channel_id': self.chain_channel_b.id},
            {'messages': 0, 'user_id': 3, 'channel_id': self.chain_channel_b.id},
            {'messages': 0, 'user_id': 3, 'channel_id': self.chain_channel_c.id},
            {'messages': 0, 'user_id': 4, 'channel_id': self.chain_channel_c.id},
            {'messages': 0, 'user_id': 4, 'channel_id': self.chain_channel_d.id},
        ]
        self.assertEqual(sorted(graph_dict['sent_messages'], key=lambda x: x['user_id']), sent_messages,
                         'Check sorting first if lists length is the same')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 16 / 6,
                         'Combination of all users pairs path length, (2+2+4+2+4+2)/6')
        self.assertEqual(calculate_density(graph, graph_type), 8 / 16, 'On each of 4 channels, 2 of possible 4 users')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 2, 'Remove >= 2 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 2, 'Remove >= 2 edges, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 1 / 3)

    def test_subscription_graph_fully_connected(self):
        """Tests subscription graph when in selected channels all users are subscribed to all channels."""
        graph_type = 'subscription'
        graph, graph_dict = create_subscription_graph(self.archive,
                                                      [self.work, self.work_single_direction, self.broken_phone])

        clustering_users = [
            {'clustering': 1, 'id': 1, 'real_name': 'Howard Wolowitz'},
            {'clustering': 1, 'id': 2, 'real_name': 'Leonard Hofstadter'},
            {'clustering': 1, 'id': 3, 'real_name': 'Raj Koothrappali'},
            {'clustering': 1, 'id': 4, 'real_name': 'Sheldon Cooper'},
        ]
        self.assertEqual(graph_dict['users'], clustering_users, 'Clustering is not as expected')

        clustering_channels = [
            {'clustering': 1, 'id': 1, 'name': 'work'},
            {'clustering': 1, 'id': 2, 'name': 'work_single_direction'},
            {'clustering': 1, 'id': 9, 'name': 'broken_phone'},
        ]
        self.assertEqual(graph_dict['channels'], clustering_channels, 'Clustering is not as expected')

        sent_messages = [
            {'messages': 100, 'user_id': 1, 'channel_id': self.work.id},
            {'messages': 100, 'user_id': 1, 'channel_id': self.work_single_direction.id},
            {'messages': 100, 'user_id': 1, 'channel_id': self.broken_phone.id},
            {'messages': 100, 'user_id': 2, 'channel_id': self.work.id},
            {'messages': 100, 'user_id': 2, 'channel_id': self.work_single_direction.id},
            {'messages': 100, 'user_id': 2, 'channel_id': self.broken_phone.id},
            {'messages': 100, 'user_id': 3, 'channel_id': self.work.id},
            {'messages': 100, 'user_id': 3, 'channel_id': self.work_single_direction.id},
            {'messages': 100, 'user_id': 3, 'channel_id': self.broken_phone.id},
            {'messages': 100, 'user_id': 4, 'channel_id': self.work.id},
            {'messages': 100, 'user_id': 4, 'channel_id': self.work_single_direction.id},
            {'messages': 0, 'user_id': 4, 'channel_id': self.broken_phone.id},
        ]
        self.assertEqual(sorted(graph_dict['sent_messages'], key=lambda x: x['user_id']), sent_messages,
                         'Check sorting first if lists length is the same')

        self.assertEqual(calculate_average_path_length(graph, graph_type), 2, 'All users are on the same channels')
        self.assertEqual(calculate_density(graph, graph_type), 1, 'All users are on the same channels')
        self.assertEqual(calculate_edge_connectivity(graph, graph_type), 3, 'Remove >= 3 edges, graph not connected')
        self.assertEqual(calculate_node_connectivity(graph, graph_type), 3, 'Remove >= 3 edges, graph not connected')
        self.assertEqual(calculate_average_clustering(graph, graph_type), 1)
