import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './views/main-layout/main-layout/main-layout.component';
import { LoginComponent } from './views/login/login/login.component';
import { BeerComponent } from './views/beer/beer/beer.component';
import { Beer2Component } from './views/beer/beer2/beer2.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'beers',
    component: MainLayoutComponent, // TODO: change main component
    children: [
      {
        path: 'b1',
        component: BeerComponent,
        // canActivate: [AuthGuard],
        // loadChildren: () => import('./view/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'b2',
        component: Beer2Component,
        // canActivate: [AuthGuard],
        // loadChildren: () => import('./view/customer/customer.module').then(m => m.CustomerModule)
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
