import { Component, OnInit } from '@angular/core';

import { BeerService } from 'src/app/services/beer/beer.service';

import { Beer } from 'src/app/interfaces/beer.interface';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  public beers: Beer[] = [];
  constructor(private beerService: BeerService) {}

  ngOnInit(): void {
    this.checkBeersImportDone();
  }

  /**
   * checkBeersImportDone
   */
  public checkBeersImportDone(): void {
    this.beerService.getAllBeers().subscribe({
      next: ({ data }) => {
        this.beers = data;
        this.beerService.onDataReceived(this.beers);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
