import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/guards/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('../../core/layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'projects',
        pathMatch: 'full',
        loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent), 
        data: {
          title: 'Projects'
        }
      },
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'Dashboard'
        }
      },
    ]
  },

  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  //   data: {
  //     title: 'Dashboard'
  //   }
  // },
  // {
  //   path: 'projects',
  //   loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent), 
  //   data: {
  //     title: 'Projects'
  //   }
  // },
];