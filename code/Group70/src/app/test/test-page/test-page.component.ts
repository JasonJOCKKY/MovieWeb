import { Component, OnInit } from '@angular/core';
import { TmdbServiceService } from '../../Services/tmdb-service.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  constructor(
    private tmdbService: TmdbServiceService
  ) { }

  ngOnInit() {

  }

}
