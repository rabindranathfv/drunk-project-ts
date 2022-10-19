import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeerComponent } from './beer/beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

const routes: Routes = [
  { path: '', component: BeerComponent },
  { path: ':id', component: BeerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeerRoutingModule {}
