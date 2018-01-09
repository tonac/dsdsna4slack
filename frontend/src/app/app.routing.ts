import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './main/home/home.component';
import {RegisterComponent} from './main/register/register.component';
import {DashboardRoutes} from './main/dashboard/dashboard.routes';
import { PublicShareComponent } from './main/publicShare/publicShare.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  ...DashboardRoutes,
  {path: 'shared/:id', component: PublicShareComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
