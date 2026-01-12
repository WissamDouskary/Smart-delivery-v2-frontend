import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { ReceiverModel } from '../../features/receivers/models/receiver.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class receviersService {
  private apiSer = inject(ApiService);

  getReceivers(): Observable<ReceiverModel[]> {
    return this.apiSer.get<ReceiverModel[]>(`receiver`).pipe(
      map((resp: any) => {
        return resp.data
      })
    );
  }
}
