import {Component, Input, OnInit} from '@angular/core';
import {Network} from 'vis';
import {ResultService} from '../../../../services/result.service';


@Component({
  selector: 'app-network-vis',
  templateUrl: './network-vis.component.html',
  styleUrls: ['./network-vis.component.css']
})
export class NetworkVisComponent implements OnInit {
  @Input() network: any;
  @Input() networkIndex: any;

  constructor(private resultService: ResultService) {
  }

  ngOnInit() {
    console.log(this.networkIndex);
    setTimeout(() => {
      const container = document.getElementById('network' + this.networkIndex);
      const network = new Network(container, this.network, this.resultService.getOptions());
    }, 50);
  }

}
