import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class jwtService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decoding token:', Error);
      return null;
    }
  }

  getRole(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const role: string = this.decodeToken(token).roles;
      const rolePrefix = role.split(",").find(item => item.startsWith("ROLE_"));
      return rolePrefix?.split("_")[1] ?? null;
    }
    return null;
  }
}
