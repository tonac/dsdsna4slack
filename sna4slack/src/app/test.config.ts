import {APP_BASE_HREF} from "@angular/common";
import {AlertService} from "./services/alert.service";
import {RegisterComponent} from "./main/register/register.component";
import {LoginComponent} from "./main/login/login.component";
import {HomeComponent} from "./main/home/home.component";
import {AlertComponent} from "./components/alert/alert.component";
import {routing} from "./app.routing";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./guards/auth.guard";
import {UserService} from "./services/user.service";
import {HttpModule} from "@angular/http";
import {AuthenticationService} from "./services/authentication.service";

export class TestConfig {
  static testModule = {
    imports: [
      HttpModule,
      FormsModule,
      routing
    ],
    declarations: [
      AppComponent,
      AlertComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent
    ],
    providers: [
      AlertService,
      AuthGuard,
      AuthenticationService,
      UserService,
      {provide: APP_BASE_HREF, useValue: '/'}
    ]
  }
}
