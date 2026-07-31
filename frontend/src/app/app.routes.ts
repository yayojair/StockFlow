import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard.component';
import { Login } from './pages/login/login.component';
import { CrearProductos } from './pages/productos/crear/crear.component';

export const routes: Routes = [
    { path: 'login', component: Login },
    //{ path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    { path: 'dashboard', component: Dashboard},
    { path: 'productos/crear', component:CrearProductos},
    //{ path: 'productos/crear', component: CrearProductos, canActivate: [authGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
