import { Route } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ArchiveRoutes } from './archive/archive.routes';
import {ResultsRoutes} from './results/results.routes';

export const DashboardRoutes: Route[] = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        ...ArchiveRoutes,
        ...ResultsRoutes,
      ]
    }
];
