import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage/storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.generateLoginForm();
  }

  public redirect() {
    this.route.navigate(['/beers']);
  }

  public generateLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.email,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public submitLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (resp: any) => {
        console.log('RESPONSE***', resp);
      },
      error: (error) => {
        console.log(error);
      },
    });

    // TODO: move both call inside success
    this.onReset();
    this.redirect();
  }

  public onReset(): void {
    this.loginForm.reset();
  }
}
