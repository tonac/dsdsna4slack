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
import {AnalyseComponent} from './main/dashboard/analyse/analyse.component';
import {ResultsComponent} from './main/dashboard/results/results.component';
import {ShareComponent} from './main/dashboard/share/share.component';

import {routing} from "./app.routing";
import {AuthGuard} from "./guards/auth.guard";
import { ShareService } from "./services/share.service";

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
      ArchiveComponent,
      AnalyseComponent,
      ResultsComponent,
      ShareComponent
    ],
    providers: [
      AlertService,
      AuthGuard,
      AuthenticationService,
      UserService,
      ShareService,
      {provide: APP_BASE_HREF, useValue: '/'}
    ]
  }
}
