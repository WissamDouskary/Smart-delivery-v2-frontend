import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./pages/home/home.page").then(h => h.Home),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./features/auth/pages/unauthorized/unauthorized').then(u => u.Unauthorized),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: '**',
    loadComponent: () => import("./pages/not-found/not-found.page").then(n => n.NotFound),
  },
];