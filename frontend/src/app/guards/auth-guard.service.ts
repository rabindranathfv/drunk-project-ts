import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.storage.getValue('token');
    if (!token) {
      this.router.navigate(['/login']).finally();
    }

    return !!token;
  }
}
