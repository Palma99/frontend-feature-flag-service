import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authRoutes } from './core/auth/auth.routes';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  ...dashboardRoutes,
  ...authRoutes,
  {
    path: '', component: AppComponent
  },
  {
    path: '**', redirectTo: ''
  }
];
