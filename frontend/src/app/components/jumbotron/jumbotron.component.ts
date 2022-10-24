import { Component, Input, OnInit } from '@angular/core';
import { Beer } from 'src/app/interfaces/beer.interface';
import { BeerService } from 'src/app/services/beer/beer.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent implements OnInit {
  @Input() beers: Beer[] = [];
  public loadMessage: string = '';

  constructor(private beerService: BeerService) {}

  ngOnInit(): void {}

  /**
   * loadBeers
   */
  public loadBeers() {
    this.beerService.loadBeers().subscribe({
      next: ({ ok, message }) => {
        if (ok) {
          this.showLoadSucess(message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * showLoadSucess
   */
  public showLoadSucess(msg: string) {
    this.loadMessage = msg;
    setTimeout(() => {
      this.loadMessage = '';
    }, 4000);
  }
}
