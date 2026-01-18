import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { productModel } from '../models/product.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private apiSer = inject(ApiService);
  
  getProducts(): Observable<productModel[]> {
    return this.apiSer.get("product").pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }
}
