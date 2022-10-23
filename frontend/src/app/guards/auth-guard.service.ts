import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let token = this.storage.getValue('token');

    this.authService.renewToken().subscribe({
      next: ({ token }) => {
        token = token;
      },
      error: (error) => {
        console.log(error);
      },
    });
    if (!token) {
      this.router.navigate(['/login']).finally();
    }

    return !!token;
  }
}
