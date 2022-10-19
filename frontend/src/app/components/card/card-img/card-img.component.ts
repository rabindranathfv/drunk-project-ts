import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss'],
})
export class CardImgComponent implements OnInit {
  public noProduct: string = '';
  constructor() {}

  ngOnInit(): void {
    this.noProduct = 'assets/img/no-image.jpg';
  }
}
