import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import("./pages/login/login.page")
    .then(l => l.Login)
  },
  {
    path: 'register',
    loadComponent: () => import("./pages/register/register.page")
    .then(r => r.Register)
  },
];
