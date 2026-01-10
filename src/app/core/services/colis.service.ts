import { inject, Injectable } from '@angular/core';
import { ColisApi } from '../../features/colis/colis.api';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class colisService {
  private colisApi = inject(ColisApi);

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
