import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './models/auth-state.model';

export const initialState: AuthState = {
    role: null,
    isAuthenticated: false,
    error: null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
        ...state,
        error: null,
    })),
    on(AuthActions.loginSuccess, (state, { response }) => ({
        ...state,
        role: response.userRole,
        isAuthenticated: true,
        error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(AuthActions.logout, () => initialState),
    on(AuthActions.setUserFromStorage, (state, { role, isAuthenticated }) => ({
        ...state,
        role,
        isAuthenticated,
    }))
);
