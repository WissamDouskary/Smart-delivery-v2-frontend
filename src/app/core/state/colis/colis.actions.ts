import { createAction, props } from '@ngrx/store';
import { colis } from '../../../features/colis/models/get-colis.model';
import { createColisModel } from '../../../features/colis/models/create-colis.model';

export const loadColis = createAction('[Colis] Load Colis');

export const loadColisSuccess = createAction(
    '[Colis] Load Colis Success',
    props<{ colis: colis[] }>()
);

export const loadColisFailure = createAction(
    '[Colis] Load Colis Failure',
    props<{ error: any }>()
);

export const loadSingleColis = createAction(
    '[Colis] Load Single Colis',
    props<{ id: string }>()
);

export const loadSingleColisSuccess = createAction(
    '[Colis] Load Single Colis Success',
    props<{ colis: colis }>()
);

export const loadSingleColisFailure = createAction(
    '[Colis] Load Single Colis Failure',
    props<{ error: any }>()
);

export const addColis = createAction(
    '[Colis] Add Colis',
    props<{ colis: createColisModel }>()
);

export const addColisSuccess = createAction(
    '[Colis] Add Colis Success',
    props<{ message: string }>()
);

export const addColisFailure = createAction(
    '[Colis] Add Colis Failure',
    props<{ error: any }>()
);
