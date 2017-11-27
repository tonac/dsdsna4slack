import {Route} from '@angular/router';
import {AuthGuard} from "../../../guards/auth.guard";
import { ShareComponent } from './share.component';


export const ShareRoutes: Route[] = [
    {
        path:'share',
        component: ShareComponent,
        canActivate: [AuthGuard]
    }
]