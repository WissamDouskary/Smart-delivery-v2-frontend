import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { colisService } from '../../services/colis.service';
import * as ColisActions from './colis.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { toast } from 'ngx-sonner';

@Injectable()
export class ColisEffects {
    private actions$ = inject(Actions);
    private colisService = inject(colisService);

    loadColis$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColisActions.loadColis),
            mergeMap(() =>
                this.colisService.getColis().pipe(
                    map((colis) => ColisActions.loadColisSuccess({ colis })),
                    catchError((error) => of(ColisActions.loadColisFailure({ error })))
                )
            )
        )
    );

    loadSingleColis$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColisActions.loadSingleColis),
            mergeMap(({ id }) =>
                this.colisService.getColisById(id).pipe(
                    map((colis) => ColisActions.loadSingleColisSuccess({ colis })),
                    catchError((error) => of(ColisActions.loadSingleColisFailure({ error })))
                )
            )
        )
    );

    addColis$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColisActions.addColis),
            mergeMap(({ colis }) =>
                this.colisService.saveColis(colis).pipe(
                    map((res: any) => ColisActions.addColisSuccess({ message: res.message })),
                    catchError((error) => of(ColisActions.addColisFailure({ error })))
                )
            )
        )
    );

    addColisSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColisActions.addColisSuccess),
            tap(({ message }) => toast.success(message)),
            map(() => ColisActions.loadColis())
        )
    );

    addColisFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColisActions.addColisFailure),
            tap(({ error }) => {
                const message = error?.error?.message || 'Error while creating colis';
                toast.error(message);
            })
        ),
        { dispatch: false }
    );
}
