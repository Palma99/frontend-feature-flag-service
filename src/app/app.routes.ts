import { Routes } from '@angular/router';
import { authRoutes } from './core/auth/auth.routes';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
  ...dashboardRoutes,
  ...authRoutes,
  {
    path: '**', redirectTo: '/login'
  }
];
