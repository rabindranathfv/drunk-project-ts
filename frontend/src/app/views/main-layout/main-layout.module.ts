import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { JumbotronComponent } from 'src/app/components/jumbotron/jumbotron.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';

import { BeerModule } from './../beer/beer.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    JumbotronComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BeerModule,
  ],
  exports: [
    MainLayoutComponent,
    NavbarComponent,
    JumbotronComponent,
    SearchBarComponent,
  ],
  providers: [],
})
export class MainLayoutModule {}
