import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainListComponent } from './pages/trains-list/trains-list.component';
import { MainComponent } from './pages/main.component';

import { TrainSearchComponent } from './pages/train-search/train-search.component';
import { ProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component'
import { AuthGuard } from './services/authGuard.service';
const routes: Routes = [
    { path:'', component:LoginComponent },
    { path:'register', component:RegisterComponent },
    {
        path:'train',component:MainComponent, children: [
            { path:'',component:TrainSearchComponent },
            { path:'trainsList',component:TrainListComponent },
        ],
        canActivate:[AuthGuard]
    },
    {   path:'profile',component:MainComponent, children: [
            {path:'',component:ProfileComponent},
            {path:'activity',component:ProfileComponent}
        ],
        canActivate:[AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }