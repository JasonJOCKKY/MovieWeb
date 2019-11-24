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
  private img_baseurl = environment.tmdb.img_baseurl;

  private genreList: Genre[] = null;
  private certificationList: Certification[] = null;

  constructor(
    private http: HttpClient
  ) {
    this.getAllGenres().subscribe((result) => {
      this.genreList = result['genres'];
    });
  }

  /*** Private helper functions ***/
  private constructUrl(urlPath: string, parameters: string) {
    return this.apiUrl + urlPath + '?api_key='+ this.apiKey + '&' + parameters;
  }


  private getMovieList(url: string) {
    let res = new Subject();

    this.http.get(url).subscribe((result) => {
      let movieList: Movie[] = [];

      while (!this.img_baseurl) {

      }
      result['results'].forEach((element) => {
        let movie: Movie = {
          id: element['id'],
          title: element['title'],
          genre_ids: element['genre_ids'],
          poster: this.getPosterUrl(500, element['poster_path']),
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
  getAllGenres() {
    let res = new Subject<Genre[]>();
    let url = "https://api.themoviedb.org/3/genre/movie/list?api_key=59a4d94af159f2d5a71a45127ee989e1&language=en-US";

    this.http.get(url).subscribe(result => {
      res.next(result['genres']);
    });

    return res;
  }

  getAllCertifications() {
    let res = new Subject();
    let url = this.constructUrl('/certification/movie/list', '');

    this.http.get(url).subscribe(result => {
      res.next(result['certifications'][this.country]);
    });

    return res;
  }

  getPosterUrl(width: number, filePath: string): string {
    if (!filePath) {
      return null;
    }
    return this.img_baseurl + '/w' + width + filePath;
  }

  // Return a genre name given a genre id
  getGenre(id: number): Genre {
    this.genreList.forEach((genre) => {
      if (genre.id == id) {
        return genre;
      }
    })

    return null;
  }

  // Search for movie and people
  searchDB(query: string) {
    let url = this.constructUrl('/search/movie', 'query=' + query);

    return this.getMovieList(url);
  }

  // Get a list of popular movies
  getPopular() {
    let url = this.constructUrl('/movie/popular', '');

    return this.getMovieList(url);
  }

  // Explore movies given filters and sort by release date
  exploreMovies_ReleaseDate(year: number, genres: number[], certification: string) {
    let genreString = '';

    if (genres) {
      genres.forEach((genre_id) => {
        genreString += genre_id + ',';
      });
    }

    let url = this.constructUrl('/discover/movie',
    'sort_by=release_date.desc' +
    '&certification_country=' + this.country +
    '&certification=' + (certification ? certification : '') +
    '&year=' + (year ? year : '') +
    '&with_genres=' + genreString);

    return this.getMovieList(url);
  }

  // Get movie details given an id
  getMovieDetail(movie_id: string) {
    let res = new Subject();
    let url = this.constructUrl('/movie/' + movie_id, 'append_to_response=credits');
    console.log(url);

    this.http.get(url).subscribe((detail) => {
      let casts: Person[] = [];
      let crews: Person[] = [];

      console.log(detail);
      detail['credits']['cast'].forEach((cast) => {
        casts.push({
          name: cast['name'],
          poster: this.getPosterUrl(185, cast['profile_path']),
          role: cast['character']
        });
      });

      detail['credits']['crew'].forEach((crew) => {
        crews.push({
          name: crew['name'],
          poster: this.getPosterUrl(185, crew['profile_path']),
          role: crew['job']
        });
      });

      let detailGenres: number[] = [];
      detail['genres'].forEach((genre) => {
        detailGenres.push(genre['id']);
      });

      let movieDetail: Movie_Detail = {
        id: detail['id'],
        title: detail['title'],
        genre_ids: detailGenres,
        poster: this.getPosterUrl(500, detail['poster_path']),
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
