import { effect, inject, Injectable, signal } from '@angular/core';
import { Flag } from '../../models/Flag';
import { FlagService } from '../../flag.service';
import { ProjectEditorService } from '../../pages/projects/project-editor/project-editor.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlagDrawerService {
  public isDrawerOpen = signal(false); 
  public flagService = inject(FlagService); 
  public projectEditorService = inject(ProjectEditorService);

  constructor(){
    effect(() => {
      if (this.projectEditorService.selectedProjectId() && this.isDrawerOpen() === true) {
        this.fetchProjectFlags();
      }
    })
  }

  fetchProjectFlags() {
    this.flagService
      .fetchProjectFlags(this.projectEditorService.selectedProjectId()!)
      .pipe(
        map((data) => data.sort((a, b) => a.name.localeCompare(b.name)))  
      )
      .subscribe((data) => {
        this.projectFlags.set(data)
      })
  }

  projectFlags = signal<Flag[]>([]);

  openDrawer() {
    this.isDrawerOpen.set(true);
  } 

  closeDrawer() {
    this.isDrawerOpen.set(false);
  }
}
