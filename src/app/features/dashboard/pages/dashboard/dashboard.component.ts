import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiAppearance, TuiLink, TuiTitle } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';

@Component({
  selector: 'app-dashboard',
  imports: [
    TuiAppearance,
    TuiTitle,
    RouterLink,
    TuiLink,
    TuiCardMedium,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
