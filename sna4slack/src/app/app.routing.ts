import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./main/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./main/login/login.component";
import {RegisterComponent} from "./main/register/register.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
