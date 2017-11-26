import {Route} from '@angular/router';
import {AuthGuard} from "../../../guards/auth.guard";
import { AnalyseComponent } from './analyse.component';


export const AnalyseRoutes: Route[] = [
    {
        path:'analyse',
        component: AnalyseComponent,
        canActivate: [AuthGuard]
    }
]