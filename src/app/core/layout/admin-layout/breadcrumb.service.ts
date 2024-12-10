import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {


  private router = inject(Router);

  public breadcrumbParts = toSignal<{
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
      })
    )
  );
}
