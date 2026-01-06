import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { RoleGuard } from './Auth/RoleGuard';
import { Unauthorized } from './pages/unauthorized/unauthorized';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AuthGuard } from './Auth/AuthGuard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Manager' },
  },
  {
    path: 'unauthorized',
    component: Unauthorized,
  },
];
