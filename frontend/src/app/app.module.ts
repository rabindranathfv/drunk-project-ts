import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './views/login/login.module';
import { MainLayoutModule } from './views/main-layout/main-layout.module';

import { AppComponent } from './app.component';
import { BeerComponent } from './views/beer/beer/beer.component';
import { Beer2Component } from './views/beer/beer2/beer2.component';

@NgModule({
  declarations: [AppComponent, BeerComponent, Beer2Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RouterModule,
    MainLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
