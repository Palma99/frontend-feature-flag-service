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
} from '@taiga-ui/core';

import {
    TuiAvatar,
    TuiFade,
    TuiTabs,
} from '@taiga-ui/kit';
import {TuiNavigation} from '@taiga-ui/layout';
import { filter, map, tap } from 'rxjs';

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
    ],
    providers: [],
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  protected expanded = signal(true);
  private router = inject(Router);

  protected breadcrumbParts = toSignal<{
    label: string;
    link: string;
  }[]>(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => {
        const parts = event.url.split('/')
        return parts
          .filter((part) => part !== '')
          .map((part) => ({
            label: part[0].toUpperCase() + part.slice(1),
            link: `/${parts.slice(0, parts.indexOf(part) + 1).join('/')}`,
          }))
      }),
    )
  );
}
