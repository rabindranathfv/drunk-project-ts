import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public username: string = '';
  public logoutActive: boolean = false;

  constructor(private storageService: StorageService, private route: Router) {
    this.showUsername();
  }

  ngOnInit(): void {}

  public showUsername(): void {
    this.logoutActive = !this.logoutActive;
    this.username = this.storageService.getValue('username') ?? '';
  }

  public logout(): void {
    this.storageService.clearAll();
    this.route.navigate(['/login']);
  }
}
