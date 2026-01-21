import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './models/auth-state.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthRole = createSelector(
    selectAuthState,
    (state: AuthState) => state.role
);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);
