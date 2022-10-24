import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './views/login/login.module';
import { MainLayoutModule } from './views/main-layout/main-layout.module';
import { AuthInterceptor } from './interceptor/interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth-guard.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RouterModule,
    MainLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
