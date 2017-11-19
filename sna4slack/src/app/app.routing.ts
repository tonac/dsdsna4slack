import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./main/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./main/register/register.component";
import {DashboardRoutes} from "./main/dashboard/dashboard.routes";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  ...DashboardRoutes,
  
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
