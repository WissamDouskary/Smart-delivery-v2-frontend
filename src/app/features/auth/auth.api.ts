import { inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Sender } from './models/sender.model';
import { authRequest } from './models/login/login-request.model';
import { authResponse } from './models/login/login-response.model';

export class AuthApi {

  private api = inject(ApiService);

  register(body: Sender) {
    return this.api.post<Sender>('auth/register', body);
  }

  login(body: authRequest) {
    return this.api.post<authResponse>(
      'auth/login',
      body
    );
  }

}