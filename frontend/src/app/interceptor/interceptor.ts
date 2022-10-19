import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let customReq;
    const token = this.storageService.getValue('token');
    customReq = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('x-token', token ?? ''),
    });
    return next.handle(customReq);
  }
}
