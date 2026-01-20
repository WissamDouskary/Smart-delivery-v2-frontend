import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { colisService } from '../services/colis.service';

export const colisResolver: ResolveFn<any> = (route, state) => {
    const id = route.paramMap.get('id');
    return inject(colisService).getColisById(id);
};
