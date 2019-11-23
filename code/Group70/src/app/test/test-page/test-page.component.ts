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
    this.tmdbService.exploreMovies_ReleaseDate(2019, [], null).subscribe(result => {
      console.log(result);
    });
  }

}
