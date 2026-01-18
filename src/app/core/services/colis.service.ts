import { inject, Injectable } from '@angular/core';
import { ColisApi } from '../../features/colis/colis.api';
import { map } from 'rxjs';
import { ApiService } from './api.service';
import { createColisModel } from '../../features/colis/models/create-colis.model';

@Injectable({
  providedIn: 'root',
})
export class colisService {
  private colisApi = inject(ColisApi);
  private apiService = inject(ApiService);

  saveColis(body: createColisModel){
    return this.apiService.post("colis", body);
  }

  getColis(){
      return this.colisApi.getAllColis()
      .pipe(
        map(
          (ele: any) => {
            return ele.data.content;
          }
        )
      )
  }

  getColisById(id: string | null){
    return this.colisApi.getColisById(id)
    .pipe(
      map((res: any) => {
        return res.data;
      })
    )
  }
}
