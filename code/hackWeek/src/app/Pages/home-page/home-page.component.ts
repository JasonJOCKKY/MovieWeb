import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../../Components/preview/preview.component';
import { TmdbService } from '../../Services/tmdb-service.service';
import { Movie, Genre, Certification} from '../../../type';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent{
  searchForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });
  exploreForm = new FormGroup({
    year: new FormControl('', [Validators.min(1888), Validators.max(2019)]),
    genre: new FormControl(''),
    rating: new FormControl(''),
  });
  searchResults: Movie[];
  movieGenres: Genre[];
  certifications: Certification[];

  constructor(
    public dialog: MatDialog,
    public movieService: TmdbService,
    ) {
    this.searchResults = [];
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
      next: (c: Certification[]) => this.certifications = c
    });
  }

  searchTitle() {
    if(this.searchForm.value.title != ""){
      let res = new Subject();
      res = this.movieService.searchDB(this.searchForm.value.title);
      res.subscribe({
        next: (v : Movie[]) => this.searchResults = v
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
      res.subscribe({
        next: (v : Movie[]) => this.searchResults = v
      });
  }

  explore(){
    this.searchResults=[];
    let year: number = this.exploreForm.value.year;
    let certification: string = this.exploreForm.value.rating;
    let genres: number[];
    if(this.exploreForm.value.genre == ""){
      genres = [];
    }
    else{
      genres = [this.exploreForm.value.genre];
    }
    let res = new Subject();
    res = this.movieService.exploreMovies_ReleaseDate(year, genres, certification);
    res.subscribe({
      next: (v : Movie[]) => this.searchResults = v
    });
  }

  onTabChange(tab){
    if(tab.index==0){
      this.searchResults = [];
    }
    else if(tab.index==1){
      this.searchResults = [];
    }
    else if(tab.index==2){
      this.searchPopular();
    }
  }

  openPreview(movie:Movie): void {
    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '500px',
      data: {title: movie.title, id: movie.id, release_date: movie.release_date, poster: movie.poster, description: movie.description}
    });
  }

  fixPoster(url){
    console.log(url);
  }

}
