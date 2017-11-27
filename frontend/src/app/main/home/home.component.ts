import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";
import {AlertService} from "../../services/alert.service";

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  selector: 'app-home',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    // TODO: if has token redirect to dashboard, why logout?
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/archives';
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
