import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login-page/login-page').then(m => m.LoginPage)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/registration/registration-page/registration-page').then(m => m.RegistrationPage)
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard-page/dashboard-page').then(m => m.DashboardPage)
  }
];
