import { inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Sender } from './models/sender.model';

export class AuthApi {

  private api = inject(ApiService);

  register(body: Sender) {
    return this.api.post<Sender>('auth/register', body);
  }

  login(body: { email: string; password: string }) {
    return this.api.post<{ token: string; userRole: string }>(
      'auth/login',
      body
    );
  }

}