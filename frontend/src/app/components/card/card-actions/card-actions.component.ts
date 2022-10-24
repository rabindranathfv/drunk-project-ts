import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent implements OnInit {
  @Input() id: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * redirectById
   */
  public redirectById(id: string) {
    this.router.navigate([`/beers/${id}`]);
  }
}
