import { Component, OnInit } from '@angular/core';

import { BeerService } from 'src/app/services/beer/beer.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public canShow: boolean = false;
  constructor(private beerService: BeerService) {}

  ngOnInit(): void {
    this.showSearch();
  }

  public findBeers(searchTerm: string) {
    if (searchTerm.length > 0) {
      // this.loading = true;
      console.log(searchTerm);
      // this._newReleasesSpotifyService.getArtists(searchTerm)
      //   .subscribe( (resp: any) => {
      //     // console.log(resp.artists.items);
      //     // this.artistList = resp.artists.items;
      //     this.artistList = resp;
      //     this.loading = false;
      //   });
    }
  }

  public showSearch() {
    this.beerService.beerDetail.subscribe((searchActive) => {
      this.canShow = searchActive;
    });
  }
}
