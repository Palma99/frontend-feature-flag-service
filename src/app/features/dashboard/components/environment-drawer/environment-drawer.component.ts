import { Component, computed, inject, linkedSignal } from '@angular/core';
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
import { FormsModule } from '@angular/forms';

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
    FormsModule,
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

  localModel = linkedSignal(this.environmentResource.value); 

  toggleLocalFlag(flagId: number) {
    this.localModel.update((localEnv) => {
      if (!localEnv) {
        return localEnv
      }

      return {
        ...localEnv,
        flags: localEnv?.flags?.map((flag) => {
          if (flag.id === flagId) {
            return {
              ...flag,
              enabled: !flag.enabled
            }
          }
          return flag
        })
      }
    })
  }

  resetLocalFlags() {
    this.localModel.set(this.environmentResource.value())
  }

  changesToSave = computed(() => {
    for(let localFlagModel of this.localModel()?.flags ?? []) {
      const remoteFlag = this.environmentResource.value()?.flags.find((flag) => flag.id === localFlagModel.id);
      if (localFlagModel.enabled !== remoteFlag?.enabled) {
        return true
      }
    }
    return false
  })

}
