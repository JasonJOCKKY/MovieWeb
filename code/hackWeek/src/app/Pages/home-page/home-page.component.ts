import { Component, OnInit } from '@angular/core';
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
    year: new FormControl(2019, [Validators.min(1888), Validators.max(2019)]),
    genres: new FormControl([]),
    rating: new FormControl(''),
  });
  searchResults: Movie[];
  movieGenres: Genre[];
  certifications: Certification[];
  isSearching: boolean = false;
  noResult: boolean = false;

  constructor(
    public dialog: MatDialog,
    public movieService: TmdbService,
    ) {
    this.searchResults = [];
    this.loadGenres();
    this.loadCertifications();
  }

  ngOnInit() {
    this.searchPopular();
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
    this.noResult = false;
    if(this.searchForm.value.title != ""){
      this.isSearching = true;
      let res = new Subject();
      res = this.movieService.searchDB(this.searchForm.value.title);
      res.subscribe({
        next: (v : Movie[]) => {
          this.searchResults = v;
          if (this.searchResults.length == 0) {
            this.noResult = true;
          }
          this.isSearching = false;
        }
      });
    }
    else{
      window.alert("Please enter a title!");
    }

  }

  searchPopular(){
    this.isSearching = true;
    this.noResult = false;
    this.searchResults=[];
    let res = new Subject();
    res = this.movieService.getPopular();
    res.subscribe({
      next: (v : Movie[]) => {
        this.searchResults = v;
        if (this.searchResults.length == 0) {
          this.noResult = true;
        }
        this.isSearching = false;;
      }
    });
  }

  explore(){
    this.isSearching = true;
    this.searchResults=[];
    let year: number = this.exploreForm.value.year;
    let certification: string = this.exploreForm.value.rating;
    let genres: number[] = this.exploreForm.value.genres;

    let res = new Subject();
    res = this.movieService.exploreMovies(year, genres, certification);
    res.subscribe({
      next: (v : Movie[]) => {
        this.searchResults = v;
        if (this.searchResults.length == 0) {
          this.noResult = true;
        }
        this.isSearching = false;
      }
    });
  }

  onTabChange(tab){
    this.noResult = false;
    if(tab.index==0){
      this.searchResults = [];
      this.searchForm.get('title').reset();
    }
    else if(tab.index==1){
      this.searchResults = [];
    }
    else if(tab.index==2){
      this.searchPopular();
    }
  }

  openPreview(movie:Movie): void {
    const dialog = this.dialog.open(PreviewComponent, {
      width: '700px',
      data: {
        movie: movie
      }
    });
  }
}
