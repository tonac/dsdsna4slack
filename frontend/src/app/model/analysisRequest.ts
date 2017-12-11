export class AnalysisRequest {
    archive: number;
    channels: string[];
    graph_type: string;

    valid(): boolean {
        if(this.archive <= 0) return false;
        if(this.channels.length == 0) return false;
        if(this.graph_type == '') return false;
    }

}