import { createReducer, on } from '@ngrx/store';
import * as FiltersActions from './filters.actions';

export interface FiltersState {
    searchTerm: string;
    status: string | null;
}

export const initialState: FiltersState = {
    searchTerm: '',
    status: null,
};

export const filtersReducer = createReducer(
    initialState,
    on(FiltersActions.setSearchTerm, (state, { searchTerm }) => ({
        ...state,
        searchTerm,
    })),
    on(FiltersActions.setStatusFilter, (state, { status }) => ({
        ...state,
        status,
    })),
    on(FiltersActions.resetFilters, () => initialState)
);
