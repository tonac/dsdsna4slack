import { Route } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ArchiveRoutes } from './archive/archive.routes';
import { AnalyseRoutes } from './analyse/analyse.routes';
import { ResultsRoutes} from './results/results.routes';
import { ShareRoutes } from './share/share.routes';


export const DashboardRoutes: Route[] = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        ...ArchiveRoutes,
        ...AnalyseRoutes,
        ...ResultsRoutes,
        ...ShareRoutes
      ]
    }
];