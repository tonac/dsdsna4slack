import { Channel } from './channel';
export class Archive {
  id: number;
  name: string;
  uploaded: string;
  channels: Channel[];

  constructor(id: number, name: string, uploaded: string,channels: Channel[]){
    this.id = id;
    this.name = name;
    this.uploaded = uploaded;
    this.channels = channels;
  }
}
