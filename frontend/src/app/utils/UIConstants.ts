export class UIConstants {

    public mentionBasedGraphLongExplanation: string = "Among the other things, this application allows you to create mention based graphs for your conversations for selected channels. In such a graph, nodes represent the people who appear in selected channels and if two nodes are connected, person A mentioned person B one or more times. Since the graph is bidirected, an edge from a person A to a person B means that the person A mentioned person B and vice versa, where the thickness of that edge represents how many times. Hovering over a node (person) shows how many times the person was mentioned, and hovering over the edge shows how many mentions that edge represents.";
    public subscriptionBasedGraphLongExplanation: string = "Subscription based graph, like the mention based graph, can be created for specific channels. In the subscription based graph, there are two types of nodes: person and channel. Those two types of nodes are connected only if a person is in, or is subscribed to a given channel. The thickness of the edge shows how many messages a certain person sent to the connected channel. Hovering over an edge shows exactly how many times that person posted a message in that channel. Since the graph is bipartite, it is planned to visually separate users on the one side, and the channels on the other.";

    public densityExplanationForMentionBased: string = "The proportion of edges in a graph compared to all possible edges that could be in that graph.";
    public densityExplanationForSubscriptionBased: string = "The proportion of edges in a graph compared to all possible edges from people to channels that could be in that graph.";
    public pathLengthExplanation: string = "The average distance between any two persons in a graph.";
    public edgeConnectivityExplanation: string = "A minimum number of edges you have to remove before you can even hope to disconnect the graph.";
    public nodeConnectivityExplanation: string = "A minimum number of nodes you have to remove before you can even hope to disconnect the graph.";
    public averageClusteringExplanationForMentionBased: string = "Number of mentioned users that are connected directly divided by number of mentioned users.";
    public averageClusteringExplanationForSubscriptionBased: string = "Average of common channels between 2 users that are subscribed to at least one common channel divided by number of channels they are both subscribed.";

}