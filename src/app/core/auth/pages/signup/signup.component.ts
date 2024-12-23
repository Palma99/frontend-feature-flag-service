import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TuiButton, TuiError } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit'; 
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent) {
    return null;
  }

  const password = control.parent.get('password')?.value;
  const confirmPassword = control.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}


@Component({
  selector: 'app-signup',
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
    passwordMismatch: 'Passwords do not match',
  })],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent{
  protected readonly signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    nickname: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      passwordMatchValidator,
    ])
  });

  private router = inject(Router);
  private authService = inject(AuthService);

  gotoLogin() {
    this.router.navigate(['login']); 
  }

  onSubmit() {
    this.authService.signup({
      email: this.signupForm.value.email ?? '',
      nickname: this.signupForm.value.nickname ?? '',
      password: this.signupForm.value.password ?? '',
      confirmPassword: this.signupForm.value.confirmPassword ?? ''
    }); 
  }
}
