import { Component } from '@angular/core';
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { NewProjectDialogComponent } from '../../components/new-project-dialog/new-project-dialog.component';

@Component({
  selector: 'app-projects',
  imports: [ProjectListComponent, TuiButton],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  private readonly newProjectDialog = tuiDialog(NewProjectDialogComponent, {
    dismissible: false,
    label: 'New project',
  });
  
  showNewProjectDialog() {
    this.newProjectDialog(1).subscribe();
  }
}
