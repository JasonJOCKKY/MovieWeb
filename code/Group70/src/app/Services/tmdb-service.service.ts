import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbServiceService {
  private apiKey = environment.tmdb.apiKey;
  private apiUrl = environment.tmdb.url;

  private imgUrl = null;
  private genres = null;

  constructor(
    private http: HttpClient
  ) {
    this.getImgUrl().subscribe(res => {
      this.imgUrl = res['secure_base_url'];
    });

    this.getAllGenres().subscribe(res => {
      this.genres = res['genres '];
    });
  }

  private makeGetRequest(req: string) {}

  private getImgUrl() {
    let url = "https://api.themoviedb.org/3/configuration?api_key=59a4d94af159f2d5a71a45127ee989e1";
    return this.http.get(url);
  }

  private getAllGenres() {
    let url = "https://api.themoviedb.org/3/genre/movie/list?api_key=59a4d94af159f2d5a71a45127ee989e1&language=en-US";
    return this.http.get(url);
  }

  getTrending() {}
  getMovieByYear() {}
  getMovieByGenre() {}

  getGenreList() {}

  getMovieDetail() {}
}
