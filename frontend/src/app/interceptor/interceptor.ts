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
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let customReq;
    const token =
      this.storageService.getValue('token') || request.headers.get('x-token');
    if (!token) {
      customReq = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set(
            'x-ratelimit-limit',
            request.headers.get('x-ratelimit-limit') ?? ''
          )
          .set(
            'x-ratelimit-remaining',
            request.headers.get('x-ratelimit-remaining') ?? ''
          ),
      });
      return next.handle(customReq);
    }

    customReq = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set(
          'x-ratelimit-limit',
          request.headers.get('x-ratelimit-limit') ?? ''
        )
        .set(
          'x-ratelimit-remaining',
          request.headers.get('x-ratelimit-remaining') ?? ''
        )
        .set('x-token', token ?? ''),
    });
    return next.handle(customReq);
  }
}
