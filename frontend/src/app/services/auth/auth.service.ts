import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public path = 'user';

  constructor(private http: HttpClient) { }

  private handleError( errorResponse: HttpErrorResponse ) {
    if ( errorResponse.error instanceof ErrorEvent) {
      console.error('cliente Side Error', errorResponse.error.message);
    } else {
      console.error('Server Side Error', errorResponse.error.message);
    }
    return throwError('there is a problem with the service. We are working to solve that..thx U');
  }

  public login(body: any): Observable<any> {
    return (this.http.post(`${environment.apiUrl}${this.path}/login`, body)).pipe(catchError(this.handleError));
  }

  public register(body: any): Observable<any> {
    return (this.http.post(`${environment.apiUrl}${this.path}/register`, body)).pipe(catchError(this.handleError));
  }

  public renewToken(): Observable<any> {
    return (this.http.get(`${environment.apiUrl}${this.path}/renew`)).pipe(catchError(this.handleError));
  }

}
