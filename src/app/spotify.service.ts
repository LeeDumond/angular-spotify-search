import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: Http) { }

  runQuery(url: string, params?: Array<string>): Observable<any[]> {

    let queryUrl = `${SpotifyService.BASE_URL}${url}`;

    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    const apiKey = environment.spotifyApiKey;
    const headers = new Headers({
      Authorization: `Bearer ${apiKey}`
    });
    const options = new RequestOptions({
      headers: headers
    });

    return this.http
      .request(queryUrl, options)
      .map((result: any) => result.json());
  }

  search(query: string, type: string): Observable<any[]> {
    return this.runQuery('/search', [`q=${query}`, `type=${type}`]);
  }

  searchTrack(query: string): Observable<any[]> {
return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.runQuery(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.runQuery(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.runQuery(`/albums/${id}`);
  }

}
