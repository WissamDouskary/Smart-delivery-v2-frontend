import { Route, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: (() => import("./dashboard/admin-dashboard").then(d => d.AdminDashboard)),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Manager' },
  },
];
