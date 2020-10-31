import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError as observableThrowError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  // This is with Form data
  postFormData(url: string, body: FormData): Observable<any> {
    if (url) {
      if (body) {

        return this.httpClient
          .post(this.appendServerUrl(url), body)
          .pipe(tap(() => { }), catchError(res => this.handleError(res)));
      } else {
        const errorMessage = 'Request body missing';
        return observableThrowError(errorMessage);
      }
    } else {
      const errorMessage = 'Url cannot be null or empty';
      return observableThrowError(errorMessage);
    }
  }

  postRequest(url: string, body: string, params?: HttpParams): Observable<any> {
    if (url) {
      if (body) {
        const httpOptions = this.getHttpOptions(params);

        return this.httpClient
          .post(this.appendServerUrl(url), body, httpOptions)
          .pipe(tap(() => { }), catchError(res => this.handleError(res)));
      } else {
        const errorMessage = 'Request body missing';
        return observableThrowError(errorMessage);
      }
    } else {
      const errorMessage = 'Url cannot be null or empty';
      return observableThrowError(errorMessage);
    }
  }

  putRequest(url: string, body: string, params?: HttpParams): Observable<any> {
    if (url) {
      if (body) {
        const httpOptions = this.getHttpOptions(params);

        return this.httpClient
          .put(this.appendServerUrl(url), body, httpOptions)
          .pipe(tap(() => { }), catchError(res => this.handleError(res)));
      } else {
        const errorMessage = 'Request body missing';
        return observableThrowError(errorMessage);
      }
    } else {
      const errorMessage = 'Url cannot be null or empty';
      return observableThrowError(errorMessage);
    }
  }

  getRequest(url: string, params?: HttpParams): Observable<any> {
    if (url) {
      const httpOptions = this.getHttpOptions(params);

      return this.httpClient
        .get(this.appendServerUrl(url), httpOptions)
        .pipe(tap(() => { }), catchError(res => this.handleError(res)));
    } else {
      const errorMessage = 'Url cannot be null or empty';
      return observableThrowError(errorMessage);
    }
  }

  getAllRequest(url: string, params?: HttpParams): Observable<any> {
    if (url) {
      const httpOptions = this.getHttpOptions(params);

      return this.httpClient
        .get(this.appendServerUrl(url), httpOptions)
        .pipe(tap(() => { }), catchError(res => this.handleError(res)));
    } else {
      const errorMessage = 'Url cannot be null or empty';
      return observableThrowError(errorMessage);
    }
  }

  deleteRequest(url: string, params?: HttpParams): Observable<any> {
    if (url) {
      const httpOptions = this.getHttpOptions(params);

      return this.httpClient
        .delete(this.appendServerUrl(url), httpOptions)
        .pipe(tap(() => { }), catchError(res => this.handleError(res)));
    } else {
      const errorMessage = 'Url cannot be null or empty';
      return observableThrowError(errorMessage);
    }
  }

  private appendServerUrl(url: string) {
    return environment.serverUrl + url;
  }

  private getHttpOptions(params: HttpParams) {
    const headers = this.getHeader();
    const httpOptions = { headers, params };
    return httpOptions;
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  private handleError(error: HttpErrorResponse) {
    // this.stopLoader();
    console.error(error);
    return throwError(error.error);
  }
}
