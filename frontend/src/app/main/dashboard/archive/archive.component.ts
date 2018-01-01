import {Component, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {Archive} from '../../../model/archive';
import {ArchiveService} from '../../../services/archive.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpinnerService} from '@chevtek/angular-spinners';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  form: FormGroup;
  hasArchives: boolean;
  archives: Array<Archive>;


  constructor(private spinnerService: SpinnerService, private alertService: AlertService,
              private archiveService: ArchiveService, private fb: FormBuilder) {
    this.form = this.fb.group({
      filename: ['', Validators.required],
      file: null
    });
  }

  ngOnInit() {
    this.hasArchives = false;
    this.spinnerService.show('dsdSpinner');

    this.archiveService.getAllForUser()
      .subscribe({
        next:
          o => {
            this.hasArchives = o.length != 0;
            this.archives = o;
            this.spinnerService.hide('dsdSpinner');
          },
        error: error => {
          this.spinnerService.hide('dsdSpinner');
          this.alertService.error('Error while fetching archives: ' + error);
        }
      });
  }

  add() {
    document.getElementById('myModal').style.display = 'block';
  }

  delete(archive: Archive) {
    this.spinnerService.show('dsdSpinner');
    this.archiveService.delete(archive.id)
    .subscribe({
      next:
        success => {
          this.spinnerService.hide('dsdSpinner'); 
          if(success) {
            this.removeArchiveFromList(archive.id);
            this.alertService.success('Archive ' + archive.name + ' successfully deleted');
          } else {
            this.alertService.error('Something went wrong.');
          }
        },
        error: error => {
          this.spinnerService.hide('dsdSpinner');
          this.alertService.error('Error while fetching archives: ' + error);
        }
    });

  }

  removeArchiveFromList(id: number) {
    var index: number = this.archives.findIndex((o) => o.id == id);
    if (index !== undefined) {
      this.archives.splice(index, 1);
    }
    if (!this.archives || !this.archives.length) {
      this.hasArchives = false;
    }
  }

  submit() {
    this.closePopup();
    var file = (<HTMLInputElement>document.getElementById('datafile')).files[0];
    const formData = new FormData();
    formData.append('datafile', file);
    this.addToArchives(file);
  }

  closePopup() {
    document.getElementById('myModal').style.display = 'none';
  }

  addToArchives(file) {
    this.spinnerService.show('dsdSpinner');
    this.archiveService.addNew(file).subscribe(
      data => {
        data.name = file.name;
        if (this.archives && this.archives.length) {
          this.archives.push(data);
        } else {
          this.hasArchives = true;
          this.archives = [data];
        }
        this.spinnerService.hide('dsdSpinner');
      },
      error => {
        this.spinnerService.hide('dsdSpinner');
        this.alertService.error('Error when adding new archive: ' + error);
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
