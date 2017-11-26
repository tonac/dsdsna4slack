import {Route} from '@angular/router';
import {AuthGuard} from "../../../guards/auth.guard";
import { ResultsComponent } from './results.component';


export const ResultsRoutes: Route[] = [
    {
        path:'results',
        component: ResultsComponent,
        canActivate: [AuthGuard]
    }
]