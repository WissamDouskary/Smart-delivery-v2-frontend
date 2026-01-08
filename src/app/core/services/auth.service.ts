import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, tap, throwError } from 'rxjs';
import { jwtService } from './jwt.service';
import { AuthApi } from '../../features/auth/auth.api';
import { Sender } from '../../features/auth/models/sender.model';
import { authRequest } from '../../features/auth/models/login/login-request.model';
import { authResponse } from '../../features/auth/models/login/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private authApi: AuthApi,
    @Inject(PLATFORM_ID) private platformId: Object,
    private jwtSer: jwtService
  ) {}

  register(body: Sender) {
    return this.authApi.register(body);
  }

  login(body: authRequest) {
    return this.authApi
      .login(body)
      .pipe(
        tap((res: authResponse) => {
          if (!this.isBrowser()) return;
          localStorage.setItem('jwtToken', res.token);
          localStorage.setItem('userRole', res.userRole);
        }),
        catchError(err => {
          return throwError(() => err)
        })
      );
  }

  logout(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.jwtSer.decodeToken(token);
    return !!decoded && decoded.exp * 1000 > Date.now();
  }

  getUserRole(): string | null {
    if (!this.isBrowser()) return null;
    return this.jwtSer.getRole();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  hasRole(role: string): boolean {
    if(this.jwtSer.getRole() == role){
      return true;
    }
    return false;
  }
}
