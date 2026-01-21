import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FiltersState } from './filters.reducer';

export const selectFiltersState = createFeatureSelector<FiltersState>('filters');

export const selectSearchTerm = createSelector(
    selectFiltersState,
    (state: FiltersState) => state.searchTerm
);

export const selectStatusFilter = createSelector(
    selectFiltersState,
    (state: FiltersState) => state.status
);
