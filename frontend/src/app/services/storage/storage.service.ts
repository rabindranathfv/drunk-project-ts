import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setValue(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  getValue(key: string): string | null {
    return localStorage.getItem(key);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  clearAll(): void {
    localStorage.clear();
  }
}
