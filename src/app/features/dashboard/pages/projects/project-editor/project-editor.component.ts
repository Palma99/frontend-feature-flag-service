import { Component, computed, inject, signal } from '@angular/core';
import { ProjectsService } from '../../../projects.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TuiAlertService, TuiAppearance, TuiButton, tuiDialog, TuiTitle } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';
import { TuiAvatar, TuiBadge } from '@taiga-ui/kit';
import { ProjectDetails } from '../../../models/ProjectDetails';
import { EnvironmentCardComponent } from "../../../components/environment-card/environment-card.component";
import { EnvironmentDrawerService } from '../../../components/environment-drawer/environment-drawer.service';
import { EnvironmentDrawerComponent } from "../../../components/environment-drawer/environment-drawer.component";
import { NewEnvironmentDialogComponent } from '../../../components/new-environment-dialog/new-environment-dialog.component';
import { NewFlagFormComponent } from "../../../components/new-flag-form/new-flag-form.component";
import { AuthService } from '../../../../../core/auth/auth.service';
import { ProjectEditorService } from './project-editor.service';
import { FlagDrawerService } from '../../../components/flags-drawer/flags-drawer.service';
import { FlagsDrawerComponent } from "../../../components/flags-drawer/flags-drawer.component";
import { ProjectPermissionsService } from '../../../project-permissions.service';

@Component({
  selector: 'app-project-editor',
  imports: [
    TuiAppearance, TuiCardMedium, TuiTitle, TuiButton, TuiAvatar, TuiBadge,
    EnvironmentCardComponent,
    EnvironmentDrawerComponent,
    NewFlagFormComponent,
    FlagsDrawerComponent
],
  templateUrl: './project-editor.component.html',
  styleUrl: './project-editor.component.scss'
})
export class ProjectEditorComponent {
  private projectsService = inject(ProjectsService)
  private route = inject(ActivatedRoute)
  private alerts = inject(TuiAlertService)
  private authService = inject(AuthService)
  
  userProjectPermissionsService = inject(ProjectPermissionsService)

  private projectEditorService = inject(ProjectEditorService)

  environmentDrawerService = inject(EnvironmentDrawerService)
  flagDrawerService = inject(FlagDrawerService)

  private readonly newEnvironmentDialog = tuiDialog(NewEnvironmentDialogComponent, {
    dismissible: false,
    label: 'New environment',
  });

  constructor() {
    this.route.params.pipe(
      map((params) => params['id']),
    ).subscribe((projectId) => {
      this.projectEditorService.selectedProjectId.set(Number(projectId)) 
      this.userProjectPermissionsService.fetchUserProjectPermissions(Number(projectId))
    })
  }
  
  showNewEnvironmentDialog() {
    const projectId = this.projectResource.value()?.id

    if (!projectId) {
      return
    }

    this.newEnvironmentDialog({
      projectId
    }).subscribe( {
      next: (data) => {
        if (data === 1) {
          this.projectResource.reload()
          this.alerts.open('Environment created!', {
            appearance: 'positive',
          }).subscribe();
        }
      },
    });
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
    request: this.projectEditorService.selectedProjectId,
    loader: ( { request: projectId }) => this.projectsService.fetchProjectDetails(projectId),
  })
}
