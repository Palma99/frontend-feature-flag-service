import { Component, computed, inject, signal } from '@angular/core';
import { ProjectsService } from '../../../projects.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TuiAppearance, TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';
import { TuiAvatar, TuiBadge } from '@taiga-ui/kit';
import { ProjectDetails } from '../../../models/ProjectDetails';
import { EnvironmentCardComponent } from "../../../components/environment-card/environment-card.component";

@Component({
  selector: 'app-project-editor',
  imports: [
    TuiAppearance, TuiCardMedium, TuiTitle, TuiButton, TuiAvatar, TuiBadge,
    EnvironmentCardComponent
],
  templateUrl: './project-editor.component.html',
  styleUrl: './project-editor.component.scss'
})
export class ProjectEditorComponent {
  private projectsService = inject(ProjectsService)
  private route = inject(ActivatedRoute)

  constructor() {
  }

  getAvatarInitials(name: string) {
    return (name.charAt(0) + name.charAt(1)).toUpperCase();
  }

  showableMembers = computed(() => {
    const members = [...this.projectResource.value()?.members ?? []];

    const ownerIndex = members.findIndex((member) => member.id === this.projectResource.value()?.owner_id);
    if (ownerIndex !== -1) {
      const owner = members.splice(ownerIndex, 1)[0];
      members.unshift(owner);
    }

    return members.slice(0, 3).map((member, i) => ({
      isOwner: i === 0,
      ...member
    }));
  }) 

  projectResource = rxResource<ProjectDetails, number>({
    request: toSignal(
      this.route.params.pipe(
        map((params) => params['id']),
      )
    ),
    loader: ( { request: projectId }) => this.projectsService.fetchProjectDetails(projectId as number),
  })

}
