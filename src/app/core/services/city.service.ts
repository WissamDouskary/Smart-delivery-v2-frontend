import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CityModel, CityResponse } from '../models/city.model';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private apiService = inject(ApiService);

    getCities(): Observable<CityModel[]> {
        return this.apiService.get<CityResponse>('cities').pipe(
            map(response => response.data)
        );
    }
}
