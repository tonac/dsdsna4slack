import { DataSet, Edge, IdType, Node } from 'vis';
import { AnalysisResult } from '../model/analysisResult';

export class GraphParser {

    private userNodeColor: string = "rgb(122,202,220)";
    private channelNodeColor: string = "rgb(77,186,147)";
    private edgeColor: string = "rgba(76,56,54,0.75)";
    private edgeHighlightedColor: string = "rgb(217,1,102)";

    public parse(result: AnalysisResult): any {
        if (result.graph_type == 'mention') {
            return this.parseMentionBasedGraph(result);
        } else if (result.graph_type == 'subscription') {
            return this.parseSubscriptionBasedGraph(result);
        }
    }

    public prune(graph: any,
        minimumNodeClustering: number,
        maximumNodeClustering: number,
        minimumInDegree: number,
        maximumInDegree: number,
        minimumOutDegree: number,
        maximumOutDegree: number): any {
            
            let edges = graph.edges._data;
            let nodes = graph.nodes._data;

            var newNodes = [];
            var newEdges = [];

            var compatibleNodes: Set<string> = new Set<string>();
            var inDegree = {};
            var outDegree = {};

            // calculate in/out degrees
            for (let id in edges) {
                let edge = edges[id];
                let nodeFrom = edge.from;
                let nodeTo = edge.to;

                inDegree[nodeTo] = inDegree[nodeTo] ? inDegree[nodeTo] + 1 : 1;
                outDegree[nodeFrom] = outDegree[nodeFrom] ? outDegree[nodeFrom] + 1 : 1;
            }

            // prune the nodes
            for (let id in nodes) {
                let node = nodes[id];
                let nodeClustering = Number(node.title.replace('Clustering: ', ''));
                if (nodeClustering) {
                    if(nodeClustering < minimumNodeClustering || nodeClustering > maximumNodeClustering) continue;
                }

                // it's not a user node in subscription graph
                if(node.id.indexOf('u') == -1) {
                    if(inDegree[node.id]) {
                        if(inDegree[node.id] < minimumInDegree || inDegree[node.id] > maximumInDegree) continue;
                    } else {
                        continue;
                    }
                }

                // it's not a channel node in subscription graph
                if(node.id.indexOf('c') == -1){
                    if(outDegree[node.id]) {
                        if(outDegree[node.id] < minimumOutDegree || outDegree[node.id] > maximumOutDegree) continue;
                    } else {
                        continue;
                    }
                }
                compatibleNodes.add(node.id);
            }

            if(compatibleNodes.size > 0) {
                for(let id in edges) {
                    let edge = edges[id];
                    let nodeFrom = edge.from;
                    let nodeTo = edge.to;
    
                    if(compatibleNodes.has(nodeFrom) && compatibleNodes.has(nodeTo)){
                        newEdges.push(edge);
                    }
                }
            }

            if(newEdges.length > 0) {
                compatibleNodes.forEach( id => {
                    newNodes.push(nodes[id]);
                });
            }

            // create a network
            return {
                nodes: new DataSet(newNodes),
                edges: new DataSet(newEdges)
            };
    }

    parseMentionBasedGraph(result: AnalysisResult): any {
        let nodes: Node = new DataSet([]);
        let edges: Edge = new DataSet([]);

        let users = result.json_graph['users'];
        let mentions = result.json_graph['mentions'];

        var userNodes = [];
        var mentionEdges = [];

        for (var user of users) {
            userNodes.push({
                id: user['id'] + '',
                title: 'Clustering: ' + user['clustering'].toFixed(3),
                label: user['real_name'],
                color: this.userNodeColor
            });
        }
        for (var mention of mentions) {
            mentionEdges.push({
                from: mention['sender_id'] + '',
                to: mention['receiver_id'] + '',
                value: mention['mentions'],
                title: mention['mentions'] + ' mentions',
                arrows: "to",
                color: {
                    color: this.edgeColor,
                    highlight: this.edgeHighlightedColor
                }
            });
        }

        nodes = new DataSet(userNodes);
        // create an array with edges
        edges = new DataSet(mentionEdges);

        // create a network
        return {
            nodes: nodes,
            edges: edges
        };
    }

    parseSubscriptionBasedGraph(result: AnalysisResult): any {
        let nodes: Node = new DataSet([]);
        let edges: Edge = new DataSet([]);

        let channels = result.json_graph['channels'];
        let sent_messages = result.json_graph['sent_messages'];
        let users = result.json_graph['users'];

        let horizontalOffset: number = 600;
        let verticalOffset: number = 100;

        let leftHeight: number = verticalOffset * users.length;
        let rightHeight: number = verticalOffset * channels.length;

        var leftOffset: number = verticalOffset;
        var rightOffset: number = verticalOffset;

        if (leftHeight > rightHeight) {
            rightOffset = leftHeight / channels.length;
        } else if (leftHeight < rightHeight) {
            leftOffset = rightHeight / users.length;
        }

        var nodesAll = [];
        var mentionEdges = [];

        var index = 0;
        for (var user of users) {
            nodesAll.push({
                id: user['id'] + 'u',
                title: 'Clustering: ' + user['clustering'].toFixed(3),
                label: user['real_name'],
                x: 0,
                y: index * leftOffset,
                color: this.userNodeColor
            });
            index++;
        }

        index = 0;
        for (var channel of channels) {
            nodesAll.push({
                id: channel['id'] + 'c',
                title: 'Clustering: ' + channel['clustering'].toFixed(3),
                label: channel['name'],
                x: horizontalOffset,
                y: index * rightOffset,
                color: this.channelNodeColor
            });
            index++;
        }

        for (var sm of sent_messages) {
            mentionEdges.push({
                from: sm['user_id'] + 'u',
                to: sm['channel_id'] + 'c',
                value: sm['messages'],
                title: sm['messages'] + ' messages',
                color: {
                    color: this.edgeColor,
                    highlight: this.edgeHighlightedColor
                }
            });
        }

        nodes = new DataSet(nodesAll);
        // create an array with edges
        edges = new DataSet(mentionEdges);

        // create a network
        return {
            nodes: nodes,
            edges: edges
        };
    }
}
