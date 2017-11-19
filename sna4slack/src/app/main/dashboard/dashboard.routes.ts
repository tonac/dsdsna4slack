import { Route } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ArchiveRoutes } from './archive/archive.routes';

export const DashboardRoutes: Route[] = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        ...ArchiveRoutes
      ]
    }
];