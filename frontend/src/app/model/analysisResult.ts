import { Graph } from './graph';

export class AnalysisResult {
    id: number;
    public: boolean;
    json_graph: string;
    density: number;
    path_length: number;
    edge_connectivity: number;
    node_connectivity: number;
    graph_type: string;
    archive: number;
    graph: any;
}