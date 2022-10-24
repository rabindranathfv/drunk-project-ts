import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeerService } from '../../../services/beer/beer.service';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss'],
})
export class CardImgComponent implements OnInit {
  public noProduct: string = '';
  @Input() img: string = '';
  @Input() id: string = '';
  public imagePath: string = '';

  constructor(private beerService: BeerService, private router: Router) {}

  ngOnInit(): void {
    this.noProduct = 'assets/img/no-image.jpg';
  }

  /**
   * loadImage
   */
  public loadImage() {
    this.beerService.getImgBeer(this.img).subscribe((res) => {
      console.log('HERE****', res);
      // this.
    });
  }

  public redirectById(id: string) {
    this.router.navigate([`/beers/${id}`]);
  }
}
