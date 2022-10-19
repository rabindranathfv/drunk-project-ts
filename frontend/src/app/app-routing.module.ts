import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './views/main-layout/main-layout/main-layout.component';
import { LoginComponent } from './views/login/login/login.component';

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
        path: '',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/beer/beer.module').then((m) => m.BeerModule),
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
