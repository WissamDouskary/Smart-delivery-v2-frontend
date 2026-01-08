import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private BASE_URL = environment.apiUrl;

  get<T>(url: string, params?: any): Observable<T> {
    return this.http
      .get<T>(`${this.BASE_URL}/${url}`, { params })
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.BASE_URL}/${url}`, body)
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.BASE_URL}/${url}`, body)
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(`${this.BASE_URL}/${url}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
