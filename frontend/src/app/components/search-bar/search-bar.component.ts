import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  findBeers(searchTerm: string) {
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
}
