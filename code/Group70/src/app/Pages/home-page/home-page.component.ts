import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Movie {
  title: string;
  director: string;
  year: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  searchForm = new FormGroup({
    title: new FormControl(''),
    director: new FormControl(''),
    year: new FormControl(''),
  });

  movies: Movie[] = [
    {title: "Citizen Kane", director: "Orson Welles", year: 1941},
    {title: "The Dark Knight", director: "Christopher Nolan", year: 2008},
    {title: "The Dark Knight 2", director: "Christopher Nolan", year: 2009},
    {title: "The Dark Knight 3", director: "Christopher Nolan", year: 2010},
    {title: "The Dark Knight 4", director: "Christopher Nolan", year: 2010},
    {title: "The Dark Knight 5", director: "Christopher Nolan", year: 2010},
    {title: "The Dark Knight 6", director: "Christopher Nolan", year: 2010},
    {title: "The Dark Knight 7", director: "Christopher Nolan", year: 2010},
    {title: "The Dark Knight 8", director: "Christopher Nolan", year: 2010},
  ];

  searchResults: Movie[] = this.movies;

  ngOnInit() {
  }

  search(){
    this.movies.forEach(function(movie: Movie){
       console.log("hi");
    });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.searchForm.value);
    this.searchResults = [];
  }
  selectFilm(){
    window.alert("hi");
  }

}

