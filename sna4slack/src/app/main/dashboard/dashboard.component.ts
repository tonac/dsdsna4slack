import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { ArchiveComponent } from '../dashboard/archive/archive.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  content: string;

  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  

  ngOnInit() {
    // this.content = '<app-archive></app-archive>';
  }


}
