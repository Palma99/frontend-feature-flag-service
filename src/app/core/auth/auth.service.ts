import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginUserDTO } from './models/LoginUserDTO';
import { TokenResponseDTO } from './models/TokenResponseDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  login(loginUserDTO: LoginUserDTO) {
    return this.http.post<TokenResponseDTO>('http://localhost:3000/auth/login',
      loginUserDTO
    ).subscribe((response) => {
      this.storeToken(response.token);
      this.router.navigate(['dashboard']);
    });
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}