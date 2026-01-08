import { Routes } from '@angular/router';
import { Home } from './pages/home/home.page';
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
    loadComponent: () => import('./features/auth/pages/login/login.page').then(m => m.Login),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/pages/register/register.page').then(m => m.Register),
  },
  {
    path: 'unauthorized',
    component: Unauthorized,
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./features/admin/dashboard/admin-dashboard').then(m => m.AdminDashboard),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Manager' },
  },
  {
    path: '**',
    component: NotFound,
  },
];