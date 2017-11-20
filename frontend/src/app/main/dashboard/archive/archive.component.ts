import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import 'rxjs/Rx'; 

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  hasArchives: boolean;
  archives: Array<string>;
  text: string;
  observer: any;

  constructor() { 
  }

  ngOnInit() {
    this.archives = [];
    this.hasArchives = this.archives.length !== 0;
    this.text = "";
    

    // Observable.from(this.archives)
    //   .subscribe({next: name => 
    //   // this.text += name;
    //   console.log(name)
    // });
    // this.archives.push('test');

  }

  add() {
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block'
  }

  submit(){
    this.closePopup();
    this.hasArchives = true;
    console.log("submit");

    var f = (<HTMLInputElement>document.getElementById('file')).files[0];
    this.archives.push(f.name);
  }

  closePopup() {
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
  }
}
