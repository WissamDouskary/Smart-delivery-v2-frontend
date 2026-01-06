import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtService } from './JwtService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private jwtSer: jwtService
  ) {}

  login(body: { email: String; password: String }) {
    return this.http
      .post<{ token: string; userRole: string }>(`${environment.apiUrl}/api/auth/login`, body)
      .pipe(
        tap((res) => {
          localStorage.setItem('jwtToken', res.token);
          localStorage.setItem('userRole', res.userRole);
        })
      );
  }

  logout(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.jwtSer.decodeToken(token);
    if (!decoded || decoded.exp * 1000 < Date.now()) return false;

    return true;
  }

  getUserRole(): string | null {
    if (!this.isBrowser()) return null;
    return this.jwtSer.getRole();
  }
}
