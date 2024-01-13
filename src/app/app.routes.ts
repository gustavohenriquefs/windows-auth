import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/login/login.component';

export const routes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: 'signin-oidc',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
