import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id: string;
  album: Object;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.spotifyService
      .getAlbum(this.id)
      .subscribe((res: any) => {
        this.renderAlbum(res);
      });
  }

  renderAlbum(res: any): void {
    this.album = res;
  }

  back(): void {
    this.location.back();
  }

}
