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
import { UserService } from 'src/app/services/user/user.service';
import Validation from 'src/app/validators/password-match.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public registerForm!: FormGroup;
  public registered: boolean;
  public user: any;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registered = false;
  }

  ngOnInit(): void {
    this.generateRegisterForm();
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
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;
    this.userService.register({ name, email, password }).subscribe({
      next: ({ data }: any) => {
        this.registered = !this.registered;
        this.user = data;
        this.registerDelay();
        this.onReset();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public onReset(): void {
    this.registerForm.reset();
  }

  public registerDelay(): void {
    setTimeout(() => {
      this.registered = !this.registered;
    }, 5000);
  }
}
