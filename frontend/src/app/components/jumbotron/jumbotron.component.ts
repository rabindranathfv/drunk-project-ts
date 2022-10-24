import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BeerService } from 'src/app/services/beer/beer.service';

import { Beer } from 'src/app/interfaces/beer.interface';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent implements OnInit {
  @Input() beers: Beer[] = [];
  public loadMessage: string = '';

  constructor(
    private beerService: BeerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  /**
   * loadBeers
   */
  public loadBeers() {
    this.beerService.loadBeers().subscribe({
      next: ({ ok, message }) => {
        if (ok) {
          this.showLoadSucess(message);
          this.reload();
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

  /**
   * reload
   */
  // implementation is good doing by reload the page and the state of the component to preserve those changes
  public reload() {
    const prevConfiguration = this.router.routeReuseStrategy.shouldReuseRoute;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route }).then(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = prevConfiguration;
      this.router.onSameUrlNavigation = 'ignore';
    });
  }
}
