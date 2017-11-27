import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";


@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent {
  model: any = {};
  loading = false;
  firstNameErrorList = [];
  lastNameErrorList = [];
  usernameErrorList = [];
  passwordErrorList = [];

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  register() {
    this.loading = true;

    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/']);
        },
        // TODO: errors are not showing to user? where? how?
        error => {
          let json = JSON.parse(error._body);
          this.firstNameErrorList = json.firstName;
          this.lastNameErrorList = json.lastName;
          this.usernameErrorList = json.username;
          this.passwordErrorList = json.password;
          if (json.detail) {
            this.alertService.error(json.detail);
          } else if (json.non_field_errors) {
            this.alertService.error(json.non_field_errors);
          } else {
            this.alertService.error("Form has errors, fix them and try again!");
          }
          this.loading = false;
        });
  }
}
