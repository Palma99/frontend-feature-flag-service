import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiError, TuiLink } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit'; 
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiInputModule,
    TuiError,
    AsyncPipe,
    TuiFieldErrorPipe,
  ],
  providers: [tuiValidationErrorsProvider({
    email: 'Email is not valid',
    required: 'Required field',
  })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected readonly loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  private authService = inject(AuthService);

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    });
  }
}
