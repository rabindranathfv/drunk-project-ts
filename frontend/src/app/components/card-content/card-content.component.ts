import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit {
  @Input() ph: number = 0;
  @Input() attenuationLevel: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
