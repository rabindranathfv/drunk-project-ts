import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  public path = 'beer';

  constructor(private http: HttpClient) {}

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('cliente Side Error', errorResponse.error.message);
    } else {
      console.error('Server Side Error', errorResponse.error.message);
    }
    return throwError(
      'there is a problem with the service. We are working to solve that..thx U'
    );
  }

  public getAllBeers(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${this.path}/`)
      .pipe(catchError(this.handleError));
  }

  public getBeer(id: string | number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${this.path}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public loadBeers(): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}${this.path}`, {})
      .pipe(catchError(this.handleError));
  }
}
