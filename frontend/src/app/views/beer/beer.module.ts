import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BeerRoutingModule } from './beer-routing.module';

import { BeerComponent } from './beer/beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { ListItemComponent } from 'src/app/components/list/list-item/list-item.component';
import { ListComponent } from 'src/app/components/list/list/list.component';
import { CardActionsComponent } from 'src/app/components/card/card-actions/card-actions.component';
import { CardImgComponent } from 'src/app/components/card/card-img/card-img.component';
import { CardTitleComponent } from 'src/app/components/card/card-title/card-title.component';
import { CardComponent } from 'src/app/components/card/card/card.component';

@NgModule({
  declarations: [
    BeerComponent,
    BeerDetailComponent,
    ListComponent,
    ListItemComponent,
    CardComponent,
    CardImgComponent,
    CardTitleComponent,
    CardImgComponent,
    CardActionsComponent,
  ],
  imports: [
    CommonModule,
    BeerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    BeerComponent,
    BeerDetailComponent,
    ListComponent,
    ListItemComponent,
    CardComponent,
    CardImgComponent,
    CardTitleComponent,
    CardImgComponent,
    CardActionsComponent,
  ],
  providers: [],
})
export class BeerModule {}
