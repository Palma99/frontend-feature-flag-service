import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentDrawerService {
  public isDrawerOpen = signal(false); 

  public selectedEnvironmentId = signal<number | null>(null);

  constructor() {}

  openDrawer(environmentId: number) {
    this.selectedEnvironmentId.set(environmentId);
    this.isDrawerOpen.set(true);
  } 

  closeDrawer() {
    this.isDrawerOpen.set(false);
    this.selectedEnvironmentId.set(null);
  }
}
