import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiExpand, TuiError } from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiButtonLoading } from '@taiga-ui/kit';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { FlagService } from '../../../flag.service';
import { useRequestStatus } from '../../../../../shared/use-request-status';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-test-payload',
  imports: [
    TuiButton,
    TuiExpand,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonLoading,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './test-payload.component.html',
  styleUrl: './test-payload.component.scss'
})
export class TestPayloadComponent {
  flagService = inject(FlagService)  
  environmentPublicKey = input<string>()

  requestStatus = useRequestStatus()

  expanded = signal(false)
  payload = signal('')

  testPayloadForm = new FormGroup({
    publicKey: new FormControl(''), 
  })

  constructor() {
    effect(() => {
      if (this.environmentPublicKey()) {
        this.testPayloadForm.setValue({publicKey: this.environmentPublicKey() ?? ''})
      }
    })
  }

  getPayload() {
    this.requestStatus.init() 

    return this.flagService.getEnvironmentFlagPayload(
      this.testPayloadForm.value.publicKey ?? ''
    ).subscribe({
      next: (data) => {
        this.payload.set(JSON.stringify(data, null, 2))
        this.requestStatus.loading.set(false)
      },
      error: (error: HttpErrorResponse) => {
        this.payload.set(JSON.stringify(error.error, null, 2))
        this.requestStatus.loading.set(false)
      }

    })
  }

  toggleExpanded() {
    this.expanded.update((value) => !value)
  }
}
