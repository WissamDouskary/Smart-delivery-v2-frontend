import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { livreurModel } from '../models/livreurs.model';

@Injectable({ providedIn: 'root' })
export class livreurService {
  private _apiService = inject(ApiService);

  getLivreurs(): Observable<livreurModel[]> {
    return this._apiService.get<livreurModel[]>('livreur').pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }

  assignLivreur(colisId: string, livreurId: string) {
    return this._apiService.patch(`colis/affect/${colisId}/livreur/${livreurId}`, null).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  updateStatusByLivreur(colisId: string | undefined, newStatus: string) {
    return this._apiService
      .patch(`colis/${colisId}/status`, JSON.stringify(newStatus), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((resp: any) => {
          return resp.data;
        })
      );
  }
}
