import { Routes } from '@angular/router';
import { Home } from './pages/home/home.page';
import { Login } from './features/auth/pages/login/login.page';
import { Unauthorized } from './features/auth/pages/unauthorized/unauthorized';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { NotFound } from './pages/not-found/not-found.page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/login',
    component: Login,
  },
  {
    path: 'unauthorized',
    component: Unauthorized,
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./features/admin/dashboard/admin-dashboard').then(m => m.AdminDashboard),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Manager' },
  },
  {
    path: '**',
    component: NotFound,
  },
];