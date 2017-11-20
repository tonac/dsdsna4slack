import {APP_BASE_HREF} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AlertService} from "./services/alert.service";
import {UserService} from "./services/user.service";
import {AuthenticationService} from "./services/authentication.service";

import {AppComponent} from "./app.component";
import {AlertComponent} from "./components/alert/alert.component";
import {HomeComponent} from "./main/home/home.component";
import {RegisterComponent} from "./main/register/register.component";
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {ArchiveComponent} from './main/dashboard/archive/archive.component';

import {routing} from "./app.routing";
import {AuthGuard} from "./guards/auth.guard";

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
      RegisterComponent,
      DashboardComponent,
      ArchiveComponent
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
