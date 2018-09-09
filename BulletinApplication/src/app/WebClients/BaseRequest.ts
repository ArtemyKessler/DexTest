import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseRequest {
  /* static handleError = (error: any): Promise<any> => {
        return Promise.reject(error.message || error);
    }; */

  static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ошибка клента: ', error.error.message);
    } else {
      console.error(`Код ошибки: ${error.status}, ` + `Тело ошибки: ${error.error}`);
    }
    return throwError('Произошла ошибка, повторите попытку позже');
  }

  constructor(protected http: HttpClient) {}

  get(url: string): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(url, {
        observe: 'response',
        responseType: 'json',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
      })
      .pipe(
        retry(5),
        catchError(BaseRequest.handleError)
      );
  }

  post(url: string, body: any): Observable<HttpResponse<any>> {
    return this.http
      .post(url, body, {
        observe: 'response',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
      })
      .pipe(
        retry(5),
        catchError(BaseRequest.handleError)
      );
  }

  /* fetch(url: string, config: RequestOptionsArgs): Promise<Response> {
    return this.http
      .request(
        url,
        Object.assign(
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
          config
        )
      )
      .toPromise();
  } */

  protected q(params: { [key: string]: string | number | boolean }): string {
    const query = Object.keys(params)
      .filter(k => params[k] !== null && params[k] !== undefined)
      .map(k => `${k}=${params[k]}`)
      .join('&');
    return query ? `?${query}` : '';
  }
}
