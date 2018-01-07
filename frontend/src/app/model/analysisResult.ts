export class AnalysisResult {
    id: number;
    public: boolean;
    json_graph: string;
    density: number;
    path_length: number;
    edge_connectivity: number;
    node_connectivity: number;
    average_clustering: number;
    graph_type: string;
    archive: number;
    graph: any;
    archive_name: string;
    analysed_channels_names: Array<any>;
}
