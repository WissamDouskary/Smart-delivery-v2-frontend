import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class jwtService {
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decoding token:', Error);
      return null;
    }
  }

  getRole(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const role: string = this.decodeToken(token).roles;
      const rolePrefix = role.split(",").find(item => item.startsWith("ROLE_"));
      return rolePrefix?.split("_")[1] ?? null;
    }
    return null;
  }
}
