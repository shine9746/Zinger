/**
 * @deprecated Use standalone routing with loadComponent instead
 * This file is kept for backward compatibility only
 */
export const authRoutes = [
  { path: 'login', loadComponent: () => import('./pages/login/login-page/login-page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/registration/registration-page/registration-page').then(m => m.RegistrationPage) }
];
