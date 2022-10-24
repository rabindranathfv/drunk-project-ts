import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BeerService } from 'src/app/services/beer/beer.service';
import { Beer } from 'src/app/interfaces/beer.interface';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss'],
})
export class BeerDetailComponent implements OnInit {
  public beer: Partial<Beer> = {};
  public beerId: string = '';

  constructor(
    private location: Location,
    private beerService: BeerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('PARAMS IN BEER DETAIL =======', params);
      // this.beerId = params.orderby;
    });
    this.getBeerByid();
  }

  public getBack() {
    this.location.back();
  }

  /**
   * getBeerByid
   */
  public getBeerByid() {
    this.beerService
      .getBeer(this.beerId ?? '6355d731f06094470939ea4e')
      .subscribe({
        next: ({ ok, data }) => {
          this.beer = ok ? data : {};
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
