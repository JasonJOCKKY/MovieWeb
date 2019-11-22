import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Movie, Movie_Detail, Person, Genre, Certification } from '../../type';

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
      this.genreList = res['genres'];
    });

    this.getAllCertifications().subscribe((res => {
      this.certificationList = res['certifications'][this.country];
    }));
  }

  /*** Private helper functions ***/
  private constructUrl(urlPath: string, parameters: string) {
    return this.apiUrl + urlPath + '?api_key='+ this.apiKey + '&' + parameters;
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

    this.http.get(url).subscribe((result) => {
      let movieList: Movie[] = [];

      result['results'].forEach((element) => {
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

  // Return a genre name given a genre id
  getGenre(id: number): Genre {
    this.genres.forEach((genre) => {
      if (genre.id == id) {
        return genre;
      }
    })

    return null;
  }

  // Search for movie and people
  searchDB(query: string) {
    let url = this.constructUrl('/search/multi', 'query=' + query);

    return this.http.get(url);
  }

  // Get a list of popular movies
  getPopular() {
    let url = this.constructUrl('/movie/popular', '');

    return this.getMovieList(url);
  }

  // Explore movies given filters and sort by release date
  exploreMovies_ReleaseDate(year: number, genres: number[], certification: string) {
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

  // Get movie details given an id
  getMovieDetail(movie_id: string) {
    let res = new Subject();
    let url = this.constructUrl('/movie/' + movie_id, 'append_to_response=credits');

    this.http.get(url).subscribe((detail) => {
      let casts: Person[] = [];
      let crews: Person[] = [];

      detail['credits']['cast'].foreach((cast) => {
        casts.push({
          name: cast['name'],
          poster: this.getPosterUrl(185, cast['profile_path']),
          role: cast['character']
        });
      });

      detail['credits']['crew'].foreach((crew) => {
        crews.push({
          name: crew['name'],
          poster: this.getPosterUrl(185, crew['profile_path']),
          role: crew['job']
        });
      });

      let detailGenres: number[] = [];
      detail['genres'].foreach((genre) => {
        detailGenres.push(genre['id']);
      });

      let movieDetail: Movie_Detail = {
        id: detail['id'],
        title: detail['title'],
        genre_ids: detailGenres,
        poster: detail['poster_path'],
        description: detail['overview'],
        release_date: detail['release_date'],
        casts: casts,
        crews: crews
      }

      res.next(movieDetail);
    });

    return res;
  }
}
