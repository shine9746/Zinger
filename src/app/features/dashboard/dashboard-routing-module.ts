/**
 * @deprecated Use standalone routing with loadComponent instead
 * This file is kept for backward compatibility only
 */
export const dashboardRoutes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard-page/dashboard-page').then(m => m.DashboardPage)
  }
];
