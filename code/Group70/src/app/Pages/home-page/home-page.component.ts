import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PreviewComponent } from '../../Components/preview/preview.component';
import { TmdbServiceService } from '../../Services/tmdb-service.service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

//will replace when all code merged
export interface Movie {
  id: number,
  title: string,
  genre_ids: number[],
  poster: string,
  description: string,
  release_date: string
}

export interface Genre {
  id: number,
  name: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{
  searchForm = new FormGroup({
    title: new FormControl(''),
  });
  exploreForm = new FormGroup({
    year: new FormControl(''),
    genre: new FormControl(''),
    rating: new FormControl(''),
  });
  movies: Movie[] = [
    {title: "Citizen Kane", id:0, description:"sample description.", release_date:"1941", poster:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg", genre_ids: []},
    {title: "Citizen Kane 2", id:0, description:"sample description.", release_date:"1941", poster:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg", genre_ids: []},
    {title: "Citizen Kane 3", id:0, description:"sample description.", release_date:"1941", poster:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg", genre_ids: []},
    {title: "Citizen Kane 4", id:0, description:"sample description.", release_date:"1941", poster:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg", genre_ids: []},
    {title: "Citizen Kane 5", id:0, description:"sample description.", release_date:"1941", poster:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg", genre_ids: []},
    {title: "Citizen Kane 6", id:0, description:"sample description.", release_date:"1941", poster:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg", genre_ids: []},
    {title: "Citizen Kane 7", id:0, description:"sample description.", release_date:"1941", poster:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg", genre_ids: []},
    {title: "Citizen Kane 8", id:0, description:"sample description.", release_date:"1941", poster:"https://images-na.ssl-images-amazon.com/images/I/81AJdOIEIhL._SL1500_.jpg", genre_ids: []},
  ];
  searchResults: Movie[];
  movieGenres: Genre[];
  certifications: any[];

  constructor(
    public dialog: MatDialog,
    public movieService: TmdbServiceService,
    ) { 
    this.searchResults = [];
    /*
    this.movieService.getAllGenres().subscribe(g =>{
      console.log(g[0]);
    });
    */
    this.loadGenres();
    this.loadCertifications();
  }

  loadGenres(){
    let res = new Subject();
    res = this.movieService.getAllGenres()
    res.subscribe({
      next: (g : Genre[]) => this.movieGenres = g
    });
  }

  loadCertifications(){
    let res = new Subject();
    res = this.movieService.getAllCertifications()
    res.subscribe({
      next: (c: any[]) => this.certifications = c
    });
  }

 
  searchTitle() {
    if(this.searchForm.value.title != ""){
      let res = new Subject();
      res = this.movieService.searchDB(this.searchForm.value.title);
      res.subscribe({
        next: (v : Movie[]) => this.searchResults = v
      });
      res.subscribe({
        next: (v: Movie[]) => console.log(v)
      });
    }
    else{
      window.alert("Please enter a title!");
    }
    
  }

  searchPopular(){
    this.searchResults=[];
    //console.log("popular movies: ",this.movieService.getPopular());
    let res = new Subject();
    res = this.movieService.getPopular();
    console.log("res: ",res);
    res.subscribe({
      next: (v : Movie[]) => this.searchResults = v
    });


  }

  explore(){
    this.searchResults=[];
    let year: number = this.exploreForm.value.year;
    let certification: string = this.exploreForm.value.rating;
    let genres: number[] = this.exploreForm.value.genre;
    let res = new Subject();
    res = this.movieService.exploreMovies_ReleaseDate(year, genres, certification);
    res.subscribe({
      next: (v : Movie[]) => this.searchResults = v
    });
  }

  openPreview(movie:Movie): void {
    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '500px',
      data: {title: movie.title, id: movie.id, releaseDate: movie.release_date, poster: movie.poster}
    });
  }

  fixPoster(url){
    console.log(url);
  }
 
}

