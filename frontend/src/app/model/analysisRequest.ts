export class AnalysisRequest {
    archive: number;
    channels: string[];
    graph_type: string;

    valid(): boolean {
        if(this.archive == null || this.channels == null || this.graph_type == null) return false;
        if(this.archive <= 0) return false;
        if(this.channels.length == 0) return false;
        if(this.graph_type == "mention" || this.graph_type == "subscription") return true;
        return false;
    }

}