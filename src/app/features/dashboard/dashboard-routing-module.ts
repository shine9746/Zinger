/**
 * @deprecated Use standalone routing with loadComponent instead
 * This file is kept for backward compatibility only
 */
export const dashboardRoutes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard').then(m => m.DashboardPage)
  }
];
