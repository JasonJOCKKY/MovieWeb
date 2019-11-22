import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PreviewComponent } from '../preview/preview.component';

export interface Movie {
  id: number,
  title: string,
  description: string,
  releaseDate: string,
  posterSrc: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog
    ) { 
    this.filteredMovies = this.movieCtrl.valueChanges
      .pipe(
        startWith(''),
        map(movie => movie ? this._filterMovies(movie) : this.movies.slice())
      );
  }

  searchForm = new FormGroup({
    title: new FormControl(''),
    director: new FormControl(''),
    year: new FormControl(''),
  });
  movieCtrl = new FormControl();
  filteredMovies: Observable<Movie[]>;
  movies: Movie[] = [
    {title: "Citizen Kane", id:0, description:"sample description.", releaseDate:"1941", posterSrc:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg"},
    {title: "Citizen Kane 2", id:0, description:"sample description.", releaseDate:"1941", posterSrc:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg"},
    {title: "Citizen Kane 3", id:0, description:"sample description.", releaseDate:"1941", posterSrc:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg"},
    {title: "Citizen Kane 4", id:0, description:"sample description.", releaseDate:"1941", posterSrc:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg"},
    {title: "Citizen Kane 5", id:0, description:"sample description.", releaseDate:"1941", posterSrc:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg"},
    {title: "Citizen Kane 6", id:0, description:"sample description.", releaseDate:"1941", posterSrc:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg"},
    {title: "Citizen Kane 7", id:0, description:"sample description.", releaseDate:"1941", posterSrc:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg"},
    {title: "Citizen Kane 8", id:0, description:"sample description.", releaseDate:"1941", posterSrc:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg"},

  ];
  searchResults: Movie[] = this.movies;

  ngOnInit() {
  }

  private _filterMovies(value: string): Movie[] {
    const filterValue = value.toLowerCase();
    return this.movies.filter(movie => movie.title.toLowerCase().indexOf(filterValue) === 0);
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

  openPreview(movie:Movie): void {
    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '500px',
      data: {title: movie.title, id: movie.id, releaseDate: movie.releaseDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

