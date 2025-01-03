import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginUserDTO } from './models/LoginUserDTO';
import { TokenResponseDTO } from './models/TokenResponseDTO';
import { Router } from '@angular/router';
import { SignupDTO } from './models/SignupDTO';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private alert = inject(TuiAlertService); 

  constructor() { }

  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  signup(signupUserDTO: SignupDTO) {
    return this.http.post<TokenResponseDTO>('http://localhost:3000/auth/register',
      signupUserDTO
    ).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: ({error}) => {
        const message = error.error
        this.alert.open(message, {
          appearance: 'negative', 
        }).subscribe()
      }
    });
  }

  login(loginUserDTO: LoginUserDTO) {
    return this.http.post<TokenResponseDTO>('http://localhost:3000/auth/login',
      loginUserDTO
    ).subscribe((response) => {
      this.storeToken(response.token);
      this.router.navigate(['dashboard']);
    });
  }

  get userId() {
    const token = this.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).userID : null;
  }

  get userNickname() {
    const token = this.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).nickname : null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
