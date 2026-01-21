import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(({ credentials }) =>
                this.authService.login(credentials).pipe(
                    map((response) => AuthActions.loginSuccess({ response })),
                    catchError((error) => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ response }) => {
                    toast.success('Login successful');
                    if (response.userRole === 'Manager') {
                        this.router.navigate(['/admin/dashboard']);
                    } else if (response.userRole === 'Sender') {
                        this.router.navigate(['/']);
                    } else if (response.userRole === 'Livreur' || response.userRole === 'Receiver') {
                        this.router.navigate(['/colis']);
                    } else {
                        this.router.navigate(['/']);
                    }
                })
            ),
        { dispatch: false }
    );

    loginFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(({ error }) => {
                    toast.error(error?.error?.message || 'Something went wrong!');
                })
            ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.authService.logout();
                    this.router.navigate(['/auth/login']);
                })
            ),
        { dispatch: false }
    );

    initAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.initAuth),
            map(() => {
                const isAuthenticated = this.authService.isLoggedIn();
                const role = this.authService.getUserRole();
                return AuthActions.setUserFromStorage({ role, isAuthenticated });
            })
        )
    );
}
