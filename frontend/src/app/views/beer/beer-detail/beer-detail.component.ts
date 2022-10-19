import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss'],
})
export class BeerDetailComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  public getBack() {
    this.location.back();
  }
}
