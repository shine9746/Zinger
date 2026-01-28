/**
 * Auth Feature Routes
 * 
 * Defines all authentication-related routes.
 * Lazy-loaded via the main app routes.
 */

import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginPage),
    data: { title: 'Login' }
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/registration/registration').then(m => m.RegistrationPage),
    data: { title: 'Registration' }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
