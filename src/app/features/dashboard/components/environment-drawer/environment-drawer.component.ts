import { Component, inject } from '@angular/core';
import { TuiButton, TuiPopup } from '@taiga-ui/core';
import { TuiDrawer, TuiSwitch } from '@taiga-ui/kit';
import { EnvironmentDrawerService } from './environment-drawer.service';
import { TuiCell, TuiHeader } from '@taiga-ui/layout';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../projects.service';
import { Environment, EnvironmentDetails } from '../../models/Environment';
import { ClipboardService } from '../../../../shared/clipboard.service';

@Component({
  selector: 'app-environment-drawer',
  imports: [
   	TuiPopup,
    TuiDrawer, 
    TuiButton,
    TuiDrawer,
    TuiHeader,

    TuiCell,
    TuiSwitch,
  ],
  templateUrl: './environment-drawer.component.html',
  styleUrl: './environment-drawer.component.scss'
})
export class EnvironmentDrawerComponent {
  protected environmentDrawerService = inject(EnvironmentDrawerService)
  private projectService = inject(ProjectsService)
  clipboardService = inject(ClipboardService)

  environmentResource = rxResource<EnvironmentDetails, number | null>({
    request: this.environmentDrawerService.selectedEnvironmentId,
    loader: ({ request: environmentId }) => this.projectService.fetchEnvironmentDetails(environmentId)
  })

}
