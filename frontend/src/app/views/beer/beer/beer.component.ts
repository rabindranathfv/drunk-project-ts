import { Component, OnInit } from '@angular/core';

import { BeerService } from 'src/app/services/beer/beer.service';

import { Beer } from 'src/app/interfaces/beer.interface';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss'],
})
export class BeerComponent implements OnInit {
  public beers: Beer[] = [];
  public beerTopIng: Beer[] = [];
  constructor(private beerService: BeerService) {}

  ngOnInit(): void {
    this.consumeBeerObs();
    this.beerService.onDataDetailReceived(true);
    this.getTopIngredients();
  }

  /**
   * consumeBeerObs
   */
  public consumeBeerObs() {
    this.beerService.beerObs.subscribe((beers: Beer[] | []) => {
      this.beers = beers;
    });
  }

  /**
   * getTopIngredients
   */
  public getTopIngredients() {
    this.beerService.getBeersByTopIngredients().subscribe({
      next: ({ data }) => {
        this.beerTopIng = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
