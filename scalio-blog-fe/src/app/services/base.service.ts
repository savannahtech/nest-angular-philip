import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

const API_URL = environment.api.base;
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient) {}

  public Get(endpoint: string): Observable<any> {
    return this.http
      .get(API_URL + endpoint)
      .pipe(
        map(response => {
          return response;
        })
      )
      .pipe(catchError(this.handleError));
  }

  public Post(endpoint: string, data: any): Observable<any> {
    return this.http
      .post(API_URL + endpoint, data)
      .pipe(catchError(this.handleError));
  }

  public Update(endpoint: string, data: any): Observable<any> {
    return this.http
      .patch(API_URL + endpoint, data)
      .pipe(catchError(this.handleError));
  }

  public Delete(endpoint: string) {
    return this.http
      .delete(API_URL + endpoint)
      .pipe(catchError(this.handleError));
  }

  //handle any error encounted while sending http request
  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    Swal.fire({
      icon: 'error',
      color: '#00657b',
      confirmButtonText: 'OK',
      confirmButtonColor: '#00657b',
      title: error.error.error,
      text: error.error.message,
    })
    return throwError(error);
  }
}
