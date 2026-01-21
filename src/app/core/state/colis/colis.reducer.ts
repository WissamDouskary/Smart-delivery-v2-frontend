import { createReducer, on } from '@ngrx/store';
import { colis } from '../../../features/colis/models/get-colis.model';
import * as ColisActions from './colis.actions';
import { ColisState } from './models/colis-state.model';

export const initialState: ColisState = {
    colis: [],
    selectedColis: null,
    error: null,
};

export const colisReducer = createReducer(
    initialState,
    on(ColisActions.loadColis, (state) => ({
        ...state,
        error: null,
    })),
    on(ColisActions.loadColisSuccess, (state, { colis }) => ({
        ...state,
        colis,
        error: null,
    })),
    on(ColisActions.loadColisFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(ColisActions.loadSingleColis, (state) => ({
        ...state,
        error: null,
    })),
    on(ColisActions.loadSingleColisSuccess, (state, { colis }) => ({
        ...state,
        selectedColis: colis,
        error: null,
    })),
    on(ColisActions.loadSingleColisFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(ColisActions.addColis, (state) => ({
        ...state,
        error: null,
    })),
    on(ColisActions.addColisSuccess, (state) => ({
        ...state,
        error: null,
    })),
    on(ColisActions.addColisFailure, (state, { error }) => ({
        ...state,
        error
    })),
);
