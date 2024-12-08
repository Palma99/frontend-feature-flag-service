import { Component, inject, signal } from '@angular/core';
import { ProjectsService } from '../../../projects.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-project-editor',
  imports: [],
  templateUrl: './project-editor.component.html',
  styleUrl: './project-editor.component.scss'
})
export class ProjectEditorComponent {
  private projectsService = inject(ProjectsService)
  private route = inject(ActivatedRoute)

  constructor() {
  }

  projectResource = rxResource({
    request: toSignal(
      this.route.params.pipe(
        map((params) => params['id']),
      )
    ),
    loader: ( { request: projectId }) => this.projectsService.fetchProjectDetails(projectId as number),
  })

}
