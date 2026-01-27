import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module')
        .then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard-routing-module').then(m => m.DashboardRoutingModule),
  },
];
