import { Component, Input, OnInit } from '@angular/core';

import { Beer } from 'src/app/interfaces/beer.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() item: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
