import { Routes } from '@angular/router';

import { NewHomeComponent } from './componentes/new-home/new-home.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component:NewHomeComponent
    }
];
