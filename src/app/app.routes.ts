import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/login/login.component';
import { HomeComponent } from './presentation/home/home.component';

export const routes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: 'signin-oidc',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
