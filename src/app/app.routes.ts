import { Routes } from '@angular/router';
import { Roles } from './components/roles/roles';
import { Rolesinsert } from './components/roles/rolesinsert/rolesinsert';

export const routes: Routes = [
    {path:'roles',component:Roles,
        children:[
            {path:'nuevo',component:Rolesinsert}
        ]

    }
];
