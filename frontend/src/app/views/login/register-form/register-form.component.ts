import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import Validation from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.generateRegisterForm();
  }

  public redirect() {
    this.route.navigate(['/beers']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  public generateRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            Validators.email,
          ],
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  public submitRegister() {
    console.log('VALUES***', this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;
    this.authService.register({ name, email, password }).subscribe({
      next: (resp: any) => {
        console.log('RESPONSE***', resp);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.redirect();
    this.onReset();
  }

  public onReset(): void {
    this.registerForm.reset();
  }
}
