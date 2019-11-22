import { Component, OnInit } from '@angular/core';
import { TmdbServiceService } from '../../Services/tmdb-service.service';
import { Movie } from 'src/type';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  movieList: Movie[] = [];

  constructor(
    private tmdbService: TmdbServiceService
  ) { }

  ngOnInit() {
    this.tmdbService.getPopular().subscribe((result: Movie[]) => {
      this.movieList = result;
      console.log(result);
    });
  }

}
