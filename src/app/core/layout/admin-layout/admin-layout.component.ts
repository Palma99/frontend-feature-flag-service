import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import {
    TuiAppearance,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiLink,
} from '@taiga-ui/core';

import {
    TuiAvatar,
    TuiBreadcrumbs,
    TuiFade,
    TuiTabs,
} from '@taiga-ui/kit';
import {TuiNavigation} from '@taiga-ui/layout';
import { TuiItem } from '@taiga-ui/cdk/directives/item';
import { BreadcrumbService } from './breadcrumb.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  imports: [
      FormsModule,
      RouterLink,
      RouterLinkActive,
      TuiAppearance,
      TuiAvatar,
      TuiButton,
      TuiDataList,
      TuiDropdown,
      TuiFade,
      TuiNavigation,
      TuiTabs,
      RouterOutlet,
      TuiBreadcrumbs,
      TuiItem,
      TuiLink,
    ],
    providers: [],
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  protected expanded = signal(true);
  protected breadcrumbService = inject(BreadcrumbService)
  protected authService = inject(AuthService)

  avatarInitials = computed(() => 
    (this.authService.userNickname[0] + this.authService.userNickname[1]).toUpperCase()
)

  avatarMenuOpen = signal(false);
}
