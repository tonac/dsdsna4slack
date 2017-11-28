import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";
import {AlertService} from "../../services/alert.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  selector: 'app-home',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  usernameErrorList = [];
  passwordErrorList = [];

  constructor(private spinnerService: Ng4LoadingSpinnerService,
              private route: ActivatedRoute,
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
    this.spinnerService.show();
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          let json = JSON.parse(error._body);
          this.usernameErrorList = json.username;
          this.passwordErrorList = json.password;
          if (json.detail) {
            this.alertService.error(json.detail);
          } else if (json.non_field_errors) {
            this.alertService.error(json.non_field_errors);
          } else {
            this.alertService.error("Form has errors, fix them and try again!");
          }
          console.log(json);
          this.spinnerService.hide();
        });
  }
}
