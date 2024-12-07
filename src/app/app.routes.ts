import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authRoutes } from './core/auth/auth.routes';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '', component: AppComponent
  },

  {
    path: '', component: AdminLayoutComponent,
    children: [
      ...dashboardRoutes,
    ]
  },

  ...authRoutes,
  {
    path: '**', redirectTo: ''
  }
];
