import { Component, OnInit } from '@angular/core';
import { TmdbServiceService } from '../../Services/tmdb-service.service';
import { Movie, Movie_Detail } from 'src/type';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  movieList: Movie[] = [];

  testMovie: Movie = null;

  constructor(
    private tmdbService: TmdbServiceService
  ) { }

  ngOnInit() {
    this.tmdbService.getPopular().subscribe((result: Movie[]) => {
      this.movieList = result;
      console.log(result);
    });

    this.tmdbService.getMovieDetail('475557').subscribe((result: Movie_Detail) => {
      console.log(result);
    });;
  }

}
