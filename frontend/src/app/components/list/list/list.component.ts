import { Component, Input, OnInit } from '@angular/core';
import { Beer } from 'src/app/interfaces/beer.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() beerTopIng: Partial<Beer[]> = [];
  constructor() {}

  ngOnInit(): void {}
}
