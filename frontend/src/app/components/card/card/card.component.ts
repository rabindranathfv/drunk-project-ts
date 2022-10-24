import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() data: any = {};
  public fullName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.fullName = `${this.data.name}, ${this.data.tagline}`;
  }
}
