import { Component, computed, inject, linkedSignal } from '@angular/core';
import { TuiAlertService, TuiButton, TuiPopup } from '@taiga-ui/core';
import { TuiButtonLoading, TuiDrawer, TuiSwitch } from '@taiga-ui/kit';
import { EnvironmentDrawerService } from './environment-drawer.service';
import { TuiCell, TuiHeader } from '@taiga-ui/layout';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../projects.service';
import { Environment, EnvironmentDetails } from '../../models/Environment';
import { ClipboardService } from '../../../../shared/clipboard.service';
import { EnvironmentService } from '../../environment.service';
import { NewFlagFormComponent } from "../new-flag-form/new-flag-form.component";
import { FormsModule } from '@angular/forms';
import { Flag } from '../../models/Flag';
import { FlagService } from '../../flag.service';
import { useRequestStatus } from '../../../../shared/use-request-status';

@Component({
  selector: 'app-environment-drawer',
  imports: [
    TuiPopup,
    TuiButtonLoading,
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
  private alerts = inject(TuiAlertService)
  private environmentService = inject(EnvironmentService)
  private flagService = inject(FlagService)

  clipboardService = inject(ClipboardService)

  updateFlagsRequestStatus = useRequestStatus()

  environmentResource = rxResource<EnvironmentDetails, number | null>({
    request: this.environmentDrawerService.selectedEnvironmentId,
    loader: ({ request: environmentId }) => this.environmentService.fetchEnvironmentDetails(environmentId)
  })

  localModel = linkedSignal(this.environmentResource.value); 

  sortedFlags = computed(() => this.localModel()?.flags?.sort((a, b) => a.name.localeCompare(b.name)) ?? [])

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

  flagsToSave = computed<Flag[]>(() => {
    return this.localModel()?.flags.filter((localFlag) => {
      const remoteFlag = this.environmentResource.value()?.flags?.find((flag) => flag.id === localFlag.id);
      if (!remoteFlag) {
        return true
      }
      return localFlag.enabled !== remoteFlag.enabled
    }) ?? []
  })

  changesToSave = computed(() => this.flagsToSave().length > 0)

  saveChanges() {
    this.updateFlagsRequestStatus.init()

    this.flagService.updateFlags(this.environmentResource.value()!.id, this.flagsToSave())
      .subscribe({
        next: () => {
          this.environmentResource.reload()
          this.updateFlagsRequestStatus.loading.set(false)

          this.alerts.open('Your changes have been saved!', {
            appearance: 'positive',
          }).subscribe()
        },
        error: (error) => {
          this.alerts.open('There was an error saving your changes, please try again', {
            appearance: 'negative',
          }).subscribe()
          this.updateFlagsRequestStatus.error.set(error.message)
          this.updateFlagsRequestStatus.loading.set(false)
        },
      })
  }

  resetLocalFlags() {
    this.localModel.set(this.environmentResource.value())
  }
}
