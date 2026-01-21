import { createAction, props } from '@ngrx/store';
import { authRequest } from '../../../features/auth/models/login/login-request.model';
import { authResponse } from '../../../features/auth/models/login/login-response.model';

export const login = createAction(
    '[Auth] Login',
    props<{ credentials: authRequest }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ response: authResponse }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const initAuth = createAction('[Auth] Initialize');

export const setUserFromStorage = createAction(
    '[Auth] Set User From Storage',
    props<{ role: string | null; isAuthenticated: boolean }>()
);
