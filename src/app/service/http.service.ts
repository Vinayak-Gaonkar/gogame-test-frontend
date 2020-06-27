import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  get(api: any): Observable<any> {
    return this.http
      .get(this.baseUrl + api)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  post(api: any, data?: any): Observable<any> {
    return this.http
      .post(this.baseUrl + api, data)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  delete(api: any, data?: any) {
    return this.http
      .delete(this.baseUrl + api)
      .pipe(
        map(respose => respose),
        catchError(this.handleError)
      );
  }


  put(api: any, data: any): Observable<any> {
    return this.http
      .put(this.baseUrl + api, data)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
