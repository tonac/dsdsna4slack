import {Route} from '@angular/router';
import {AuthGuard} from "../../../guards/auth.guard";
import { ArchiveComponent } from './archive.component';


export const ArchiveRoutes: Route[] = [
    {
        path:'archives',
        component: ArchiveComponent,
        canActivate: [AuthGuard]
    }
]