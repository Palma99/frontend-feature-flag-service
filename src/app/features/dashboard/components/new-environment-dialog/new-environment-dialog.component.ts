import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiError } from '@taiga-ui/core';
import { TuiButtonLoading, TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import {injectContext} from '@taiga-ui/polymorpheus';
import { Router } from '@angular/router';
import { useRequestStatus } from '../../../../shared/use-request-status';
import { ProjectsService } from '../../projects.service';
import { EnvironmentService } from '../../environment.service';

@Component({
  selector: 'app-new-environment-dialog',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiInputModule,
    TuiError,
    AsyncPipe,
    TuiFieldErrorPipe,
    TuiButtonLoading,
  ],
  templateUrl: './new-environment-dialog.component.html',
  styleUrl: './new-environment-dialog.component.scss'
})
export class NewEnvironmentDialogComponent {

  readonly context = injectContext<TuiDialogContext<number, {
    projectId: number
  }>>();
  private readonly alerts = inject(TuiAlertService);

  private environmentService = inject(EnvironmentService)

  protected requestStatus = useRequestStatus()

  environmentForm = new FormGroup({
    environmentName: new FormControl('', [
      Validators.required,
    ]),
  }) 

  constructor() { }

  submit() {
    if (!this.environmentForm.valid) {
      return;
    }

    const environmentName = this.environmentForm.value.environmentName!;

    this.requestStatus.init()

    this.environmentService.createEnvironment(this.context.data.projectId, environmentName)
      .subscribe({
        next: () => {
          this.requestStatus.loading.set(false)
          this.context.completeWith(1);
        },
        error: (error) => {
          this.requestStatus.loading.set(false)
          this.requestStatus.error.set(error.message)

          this.alerts.open('Something went wrong. Please try again', {
            appearance: 'negative',
          }).subscribe();
        },
      });
  }
}
