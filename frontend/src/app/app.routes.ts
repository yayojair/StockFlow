import { Routes } from '@angular/router';

import { Login } from './pages/login/login.component';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
