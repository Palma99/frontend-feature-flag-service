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

@Component({
  selector: 'app-new-project-dialog',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiInputModule,
    TuiError,
    AsyncPipe,
    TuiFieldErrorPipe,
    TuiButtonLoading,
  ],
  templateUrl: './new-project-dialog.component.html',
  styleUrl: './new-project-dialog.component.scss',
  providers: [tuiValidationErrorsProvider({
    projectName: 'Project name is required',
  })],
})
export class NewProjectDialogComponent {
  readonly context = injectContext<TuiDialogContext<number, number>>();
  private readonly alerts = inject(TuiAlertService);

  private router = inject(Router)
  private projectService = inject(ProjectsService)

  protected requestStatus = useRequestStatus()

  projectForm = new FormGroup({
    projectName: new FormControl('', [
      Validators.required,
    ]),
  }) 

  constructor() {}

  submit() {
    if (!this.projectForm.valid) {
      return;
    }

    const projectName = this.projectForm.value.projectName!;

    this.requestStatus.init()

    this.projectService.createProject(projectName)
      .subscribe({
        next: ({ projectId }) => {
          this.context.completeWith(1);
          this.router.navigate(['dashboard', 'projects', projectId]);
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

