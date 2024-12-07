import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/guards/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    data: {
      title: 'Dashboard'
    }
  },
];