import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PreviewComponent } from '../preview/preview.component';

//will replace when all code merged
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
export class HomePageComponent{
  searchForm = new FormGroup({
    title: new FormControl(''),
    year: new FormControl(''),
    genre: new FormControl(''),
  });
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
  searchResults: Movie[];

  constructor(public dialog: MatDialog) { 
    this.searchResults = [];
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.searchForm.value);
    this.searchResults = this.movies;
  }

  openPreview(movie:Movie): void {
    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '500px',
      data: {title: movie.title, id: movie.id, releaseDate: movie.releaseDate}
    });
  }
}

