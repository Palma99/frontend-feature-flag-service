import { Component, inject } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { rxResource } from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {TuiTable} from '@taiga-ui/addon-table';
import {
    TuiButton,
    TuiDropdown,
    TuiLoader,
    TuiTitle,
} from '@taiga-ui/core';
import {
    TuiBadge,
    TuiItemsWithMore,
    TuiStatus,
} from '@taiga-ui/kit';
import {TuiCell} from '@taiga-ui/layout';
import { AuthService } from '../../../core/auth/auth.service';
import { ProjectList } from '../models/ProjectList';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [
    RouterLink,
    FormsModule,
    TuiLoader,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiDropdown,
    TuiItemsWithMore,
    TuiStatus,
    TuiTable,
    TuiTitle,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  private projectService = inject(ProjectsService);  
  private authService = inject(AuthService);

  isOwner(project: ProjectList) {
    return project.owner_id === this.authService.userId; 
  }

  projectsResource = rxResource({
    loader: () => this.projectService.fetchProjects(),
  }); 
}
