import { Component, inject } from '@angular/core';
import { ProjectListComponent } from "../../project-list/project-list.component";
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { NewProjectDialogComponent } from '../../new-project-dialog/new-project-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [ProjectListComponent, TuiButton],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private router = inject(Router);

  private readonly newProjectDialog = tuiDialog(NewProjectDialogComponent, {
    dismissible: false,
    label: 'New project',
  });
  
  showNewProjectDialog() {
    this.newProjectDialog(1).subscribe();
  }
}
