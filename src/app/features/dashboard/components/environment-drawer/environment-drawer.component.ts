import { Component, inject } from '@angular/core';
import { TuiButton, TuiPopup } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { EnvironmentDrawerService } from './environment-drawer.service';
import { TuiHeader } from '@taiga-ui/layout';
import { rxResource } from '@angular/core/rxjs-interop';
import { EnvironmentDetails } from '../../models/Environment';
import { ClipboardService } from '../../../../shared/clipboard.service';
import { EnvironmentService } from '../../environment.service';
import { NewFlagFormComponent } from "../new-flag-form/new-flag-form.component";
import { FormsModule } from '@angular/forms';
import { FlagListComponent } from "./flag-list/flag-list.component";
import { TestPayloadComponent } from "./test-payload/test-payload.component";
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-environment-drawer',
  imports: [
    TuiPopup,
    TuiDrawer,
    TuiButton,
    TuiDrawer,
    TuiHeader,
    FormsModule,
    NewFlagFormComponent,
    FlagListComponent,
    TestPayloadComponent,
    NgTemplateOutlet,
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
