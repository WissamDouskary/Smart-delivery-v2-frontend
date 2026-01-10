import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((h) => h.Home),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/auth/pages/unauthorized/unauthorized').then((u) => u.Unauthorized),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'colis',
    loadComponent: () => import('./features/colis/pages/colis/colis').then((c) => c.Colis),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Sender', 'Manager', 'Livreur'],
    },
  },
  {
    path: 'oauth2/callback',
    loadComponent: () => import("./features/auth/components/OAuth2CallbackComponent").then(o => o.OAuth2CallbackComponent),
  },
  {
    path: "colis/:id",
    loadComponent: () => import("./features/colis/pages/colis-precise/single-colis/single-colis").then(c => c.SingleColis),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Sender', 'Manager', 'Livreur'],
    },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page').then((n) => n.NotFound),
  },
];