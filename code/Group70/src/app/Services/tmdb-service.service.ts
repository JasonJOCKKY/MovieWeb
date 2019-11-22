import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Movie, Person, Genre, Certification } from '../../type';

@Injectable({
  providedIn: 'root'
})
export class TmdbServiceService {
  private apiKey = environment.tmdb.apiKey;
  private apiUrl = environment.tmdb.url;
  private country = environment.tmdb.country;

  private img_baseurl: string = null;
  private genreList: Genre[] = null;
  private certificationList: Certification[] = null;

  constructor(
    private http: HttpClient
  ) {
    this.getImgBaseUrl().subscribe(res => {
      this.img_baseurl = res['secure_base_url'];
    });

    this.getAllGenres().subscribe(res => {
      this.genreList = res['genres '];
    });

    this.getAllCertifications().subscribe((res => {
      this.certificationList = res['certifications'][this.country];
    }));
  }

  /*** Private helper functions ***/
  private constructUrl(urlPath: string, parameters: string) {
    return this.apiUrl + urlPath + '?apikey='+ this.apiKey + '&' + parameters;
  }

  private getImgBaseUrl() {
    let url = this.constructUrl('/configuration', '');
    return this.http.get(url);
  }

  private getAllGenres() {
    let url = "https://api.themoviedb.org/3/genre/movie/list?api_key=59a4d94af159f2d5a71a45127ee989e1&language=en-US";
    return this.http.get(url);
  }

  private getAllCertifications() {
    let url = this.constructUrl('/certification/movie/list', '');
    return this.http.get(url);
  }

  private getMovieList(url: string) {
    let res = new Subject();

    this.http.get(url).subscribe((result: any[]) => {
      let movieList: Movie[] = [];

      result.forEach((element) => {
        let movie: Movie = {
          id: element['id'],
          title: element['title'],
          genre_ids: element['genre_ids'],
          poster: this.getPosterUrl(200, element['poster_path']),
          description: element['overview'],
          release_date: element['release_date']
        }

        movieList.push(movie);
      });

      res.next(movieList);
    });

    return res;
  }

  /*** Public functions ***/
  get genres() {
    return this.genreList;
  }

  get certifications() {
    return this.certificationList;
  }

  getPosterUrl(width: number, filePath: string): string {
    if (!this.img_baseurl) {
      return null;
    }

    return this.img_baseurl + '/w' + width + filePath;
  }

  getGenre(id: number): Genre {
    this.genres.forEach((genre) => {
      if (genre.id == id) {
        return genre;
      }
    })

    return null;
  }

  searchDB(query: string) {
    let url = this.constructUrl('/search/multi', 'query=' + query);

    return this.http.get(url);
  }

  getPopular() {
    // Get a list of popular movies
    let url = this.constructUrl('/movie/popular', '');

    return this.getMovieList(url);
  }

  exploreMovies_ReleaseDate(year: number, genres: number[], certification: string) {
    // Return an observable
    // The observable will emit an array of movies once the serch is complete
    let genreString = '';

    genres.forEach((genre_id) => {
      genreString += this.getGenre(genre_id) + ',';
    });

    let url = this.constructUrl('/discover/movie',
    'sort_by=release_date.desc' +
    '&certification_country=' + this.country +
    '&certification=' + certification +
    '&year=' + year +
    '&with_genres=' + genreString);

    return this.getMovieList(url);
  }

  exploreMovies_Rating(year: number, genres: number[], certification: string) {
    // Return data from firebase
  }

  getMovieDetail() {

  }
}
