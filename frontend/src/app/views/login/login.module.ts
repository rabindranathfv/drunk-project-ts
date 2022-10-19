import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent, RegisterFormComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [LoginComponent, LoginFormComponent, RegisterFormComponent],
  providers: [],
})
export class LoginModule {}
