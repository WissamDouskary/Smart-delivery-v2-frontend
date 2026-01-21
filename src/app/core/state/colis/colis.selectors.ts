import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColisState } from './models/colis-state.model';

export const selectColisState = createFeatureSelector<ColisState>('colis');

export const selectAllColis = createSelector(
    selectColisState,
    (state: ColisState) => state.colis
);

export const selectSelectedColis = createSelector(
    selectColisState,
    (state: ColisState) => state.selectedColis
);

export const selectColisError = createSelector(
    selectColisState,
    (state: ColisState) => state.error
);
