import { createAction, props } from '@ngrx/store';

export const setSearchTerm = createAction(
    '[Filters] Set Search Term',
    props<{ searchTerm: string }>()
);

export const setStatusFilter = createAction(
    '[Filters] Set Status Filter',
    props<{ status: string | null }>()
);

export const resetFilters = createAction('[Filters] Reset Filters');
