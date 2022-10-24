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
  public beerImg: string = '';

  constructor(
    private location: Location,
    private beerService: BeerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.beerService.onDataDetailReceived(false);
    this.beerId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getBeerByid();
  }

  public getBack() {
    this.location.back();
  }

  public getBeerByid() {
    this.beerService.getBeer(this.beerId).subscribe({
      next: ({ ok, data }) => {
        if (ok) {
          this.beer = data;
          this.beerImg = data.image_url ?? 'assets/img/no-image.jpg';
          this.loadBearImage(data.image_url ?? '');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * loadBearImage
   */
  public loadBearImage(url: string) {
    if (url === '') return;

    this.beerService.getImgBeer(url).subscribe((img) => {
      console.log(
        '🚀 ~ file: beer-detail.component.ts ~ line 49 ~ BeerDetailComponent ~ this.beerService.getImgBeer ~ img',
        img
      );
      // this.beerImg = img;
    });
  }
}
