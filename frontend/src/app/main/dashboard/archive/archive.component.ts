import {Component, OnInit} from '@angular/core';
import 'rxjs/Rx';
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
  loading: boolean;
  archives: Array<Archive>;

  constructor(private archiveService: ArchiveService, private fb: FormBuilder) {
    this.form = this.fb.group({
      filename: ['', Validators.required],
      file: null
    });
  }

  ngOnInit() {
    this.hasArchives = false;
    this.loading = true;

    this.archiveService.getAllForUser()
      .subscribe({
        next:
          o => {
            this.hasArchives = o.length != 0;
            this.archives = o;
            this.loading = false;
          }
      });
  }

  add() {
    document.getElementById('myModal').style.display = 'block';
  }

  delete(archive: Archive) {
    var index: number = this.archives.findIndex((o) => o == archive);
    if (index !== undefined) {
      this.archives.splice(index, 1);
    }
  }

  submit() {
    this.closePopup();
    var f = (<HTMLInputElement>document.getElementById('file')).files[0];
    this.addToArchives(f.name);
  }

  closePopup() {
    document.getElementById('myModal').style.display = 'none';
  }

  addToArchives(archive: string) {
    this.loading = true;
    this.archiveService.addNew(this.form.value, archive).subscribe(
      data => {
        data.name = archive;
        this.archives.push(data);
        this.loading = false;
      });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
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
