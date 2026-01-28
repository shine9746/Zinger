/**
 * @deprecated Use standalone routing with loadComponent instead
 * This file is kept for backward compatibility only
 */
export const authRoutes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/registration/registration').then(m => m.RegistrationPage) }
];
