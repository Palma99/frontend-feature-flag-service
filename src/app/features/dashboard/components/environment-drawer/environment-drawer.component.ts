import { Component, inject } from '@angular/core';
import { TuiButton, TuiPopup } from '@taiga-ui/core';
import { TuiDrawer, TuiSwitch } from '@taiga-ui/kit';
import { EnvironmentDrawerService } from './environment-drawer.service';
import { TuiCell, TuiHeader } from '@taiga-ui/layout';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../projects.service';
import { Environment, EnvironmentDetails } from '../../models/Environment';
import { ClipboardService } from '../../../../shared/clipboard.service';
import { EnvironmentService } from '../../environment.service';
import { NewFlagFormComponent } from "../new-flag-form/new-flag-form.component";

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
    NewFlagFormComponent
],
  templateUrl: './environment-drawer.component.html',
  styleUrl: './environment-drawer.component.scss'
})
export class EnvironmentDrawerComponent {
  protected environmentDrawerService = inject(EnvironmentDrawerService)
  private environmentService = inject(EnvironmentService)
  clipboardService = inject(ClipboardService)

  environmentResource = rxResource<EnvironmentDetails, number | null>({
    request: this.environmentDrawerService.selectedEnvironmentId,
    loader: ({ request: environmentId }) => this.environmentService.fetchEnvironmentDetails(environmentId)
  })

}
