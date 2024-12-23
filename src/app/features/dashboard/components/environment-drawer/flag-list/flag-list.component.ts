import { Component, computed, inject, input, linkedSignal, output, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiAlertService } from '@taiga-ui/core';
import { TuiButtonLoading, TuiSwitch } from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { ClipboardService } from '../../../../../shared/clipboard.service';
import { useRequestStatus } from '../../../../../shared/use-request-status';
import { FlagService } from '../../../flag.service';
import { Flag } from '../../../models/Flag';
import { EnvironmentDrawerService } from '../environment-drawer.service';

@Component({
  selector: 'app-flag-list',
  imports: [
    TuiButtonLoading,
    TuiButton,
    TuiCell,
    TuiSwitch,
    FormsModule,
  ],
  templateUrl: './flag-list.component.html',
  styleUrl: './flag-list.component.scss'
})
export class FlagListComponent {
  
  saveActions = viewChild.required<TemplateRef<any>>('saveActions')

  remoteFlags = input<Flag[]>([])
  environmentId = input<number>()
  saved = output()

  protected environmentDrawerService = inject(EnvironmentDrawerService)
  private alerts = inject(TuiAlertService)
  private flagService = inject(FlagService)

  clipboardService = inject(ClipboardService)

  updateFlagsRequestStatus = useRequestStatus()

  localModel = linkedSignal(this.remoteFlags); 
  sortedFlags = computed(() => this.localModel().sort((a, b) => a.name.localeCompare(b.name)) ?? [])
  toggleLocalFlag(flagId: number) {
    this.localModel.update((localEnv) => {
      return localEnv.map((flag) => {
        if (flag.id === flagId) {
          return {
            ...flag,
            enabled: !flag.enabled
          }
        }
        return flag
      })
    })
  }

  flagsToSave = computed<Flag[]>(() => {
    return this.localModel().filter((localFlag) => {
      const remoteFlag = this.remoteFlags().find((flag) => flag.id === localFlag.id);
      if (!remoteFlag) {
        return true
      }
      return localFlag.enabled !== remoteFlag.enabled
    }) ?? []
  })

  changesToSave = computed(() => this.flagsToSave().length > 0)

  saveChanges() {
    this.updateFlagsRequestStatus.init()
    if (this.environmentId() === null) {
      return
    }

    this.flagService.updateFlags(this.environmentId()!, this.flagsToSave())
      .subscribe({
        next: () => {
          this.updateFlagsRequestStatus.loading.set(false)
          this.saved.emit()
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
    this.localModel.set(this.remoteFlags())
  }
}
