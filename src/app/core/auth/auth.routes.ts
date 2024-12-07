import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { guestGuard } from './guards/guest.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  }
];
