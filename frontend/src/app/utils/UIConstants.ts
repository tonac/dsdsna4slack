export class UIConstants {

    public densityExplanationForMentionBased: string = "The proportion of edges in a graph compared to all possible edges that could be in that graph.";
    public densityExplanationForSubscriptionBased: string = "The proportion of edges in a graph compared to all possible edges from people to channels that could be in that graph.";
    public pathLengthExplanation: string = "The average distance between any two persons in a graph.";
    public edgeConnectivityExplanation: string = "A minimum number of edges you have to remove before you can even hope to disconnect the graph.";
    public nodeConnectivityExplanation: string = "A minimum number of nodes you have to remove before you can even hope to disconnect the graph.";
    public averageClusteringExplanationForMentionBased: string = "Number of mentioned users that are connected directly divided by number of mentioned users.";
    public averageClusteringExplanationForSubscriptionBased: string = "Average of common channels between 2 users that are subscribed to at least one common channel divided by number of channels they are both subscribed.";

}