import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard.component';
import { Login } from './pages/login/login.component';
import { CrearProductos } from './pages/productos/crear/crear.component';
import { ListarProductos } from './pages/productos/listar/listar.component';
import { authGuard } from './core/guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    { path: 'productos/crear', component: CrearProductos, canActivate: [authGuard]},
    { path: 'productos/lista', component: CrearProductos, canActivate: [authGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
