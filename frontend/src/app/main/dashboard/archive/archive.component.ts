import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Archive} from '../../../model/archive';
import {ArchiveService} from '../../../services/archive.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  form: FormGroup;
  hasArchives: boolean;
  archives: Observable<Array<Archive>>;

  archivesArray: Array<Archive>;
  archivesSubject: BehaviorSubject<Array<Archive>>;

  constructor(private archiveService: ArchiveService, private fb: FormBuilder) {
    this.form = this.fb.group({
      filename: ['', Validators.required],
      file: null
    });
  }

  ngOnInit() {
    var tmpArchive: Archive = new Archive();
    tmpArchive.id = 0;
    tmpArchive.name = 'DSD-sna4slack';
    tmpArchive.lastModified = new Date(2017, 11, 25, 0, 0, 0, 0);
    this.archivesArray = [tmpArchive];
    this.archivesSubject = new BehaviorSubject<Array<Archive>>(this.archivesArray);
    this.archives = this.archiveService.getAllForUser();
    this.hasArchives = false;

    this.archives
      .subscribe({
        next:
          o => this.hasArchives = o.length != 0
      });
  }

  add() {
    document.getElementById('myModal').style.display = 'block';
  }

  delete(id: number) {
    var index: number = this.archivesArray.findIndex((o) => o.id === id);
    if (index !== undefined) {
      this.archivesArray.splice(index, 1);
    }
    this.archivesSubject.next(this.archivesArray);
  }

  submit() {
    this.closePopup();
    var f = (<HTMLInputElement>document.getElementById('file')).files[0];
    console.log(this.form);
    this.addToArchives(f.name);
  }

  closePopup() {
    document.getElementById('myModal').style.display = 'none';
  }

  addToArchives(archive: string) {
    this.archiveService.addNew(this.form.value, archive).subscribe(
      data => {
        console.log(data);
      });


    var newArchive: Archive = new Archive();
    newArchive.name = archive;
    newArchive.lastModified = new Date();

    var maxIndex = Math.max(...this.archivesArray.map((o) => o.id));
    newArchive.id = maxIndex + 1;
    this.archivesArray.push(newArchive);
    this.archivesSubject.next(this.archivesArray);
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('file').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
        this.form.get('filename').setValue(file.name);
      };
    }
  }
}
