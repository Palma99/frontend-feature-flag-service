import { AsyncPipe } from '@angular/common';
import { Component, inject, input, Input, output, Output, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiAlertService, TuiButton, TuiError, TuiExpand } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiButtonLoading } from '@taiga-ui/kit';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { FlagService } from '../../flag.service';
import { useRequestStatus } from '../../../../shared/use-request-status';

@Component({
  selector: 'app-new-flag-form',
  imports: [
    TuiButton,
    TuiExpand,
    ReactiveFormsModule,
    TuiInputModule,
    TuiError,
    AsyncPipe,
    TuiFieldErrorPipe,
    TuiButtonLoading,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './new-flag-form.component.html',
  styleUrl: './new-flag-form.component.scss'
})
export class NewFlagFormComponent {
  projectId = input<number>()
  created = output()
  disabled = input<boolean>(false)

  private flagService = inject(FlagService)
  protected requestStatus = useRequestStatus()
  private alerts = inject(TuiAlertService)

  expanded = signal(false)

  flagForm = new FormGroup({
    flagName: new FormControl('', [
      Validators.required,
    ]),
  }) 

  close() {
    this.flagForm.reset()
    this.expanded.set(false)
  }

  submit() {
    if (!this.flagForm.valid || this.projectId === null || this.projectId() === undefined) {
      return;
    }

    const flagName = this.flagForm.value.flagName!;

    this.flagService.createFlag(this.projectId()!, flagName)
      .subscribe({
        next: () => {
          this.alerts.open('Flag created!', {
            appearance: 'positive',
          }).subscribe();

          this.close()
          this.created.emit()
        },
        error: (error) => {
          this.requestStatus.error.set(error.message)

          this.alerts.open('Something went wrong. Please try again', {
            appearance: 'negative',
          }).subscribe();
        },
        complete: () => {
          this.requestStatus.loading.set(false)
        }
      });
  }
}

