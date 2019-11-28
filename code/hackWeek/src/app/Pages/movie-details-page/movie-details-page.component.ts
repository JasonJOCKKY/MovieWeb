import { Component, OnInit } from '@angular/core';

import { Person, Reply, Movie_Detail, Review } from 'src/type';
import { ReviewService } from 'src/app/Services/review.service';

import { AddReviewComponent } from 'src/app/Components/add-review/add-review.component';
import { TmdbService } from 'src/app/Services/tmdb-service.service';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MatDialog, MatTreeNestedDataSource } from '@angular/material';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { NestedTreeControl } from '@angular/cdk/tree';



@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.scss']
})

export class MovieDetailsPageComponent implements OnInit {

  movie: Movie_Detail;

  reviewsExpandControl: Boolean[] = [];
  replyTreeControls: NestedTreeControl<Reply>[] = [];
  reviews: Review[] = [];
  averageScore: number;

  director: string;
  crewFirstRow: Person[];
  castFirstRow: Person[];
  crewRest: Person[];
  castRest: Person[];
  peopleCol = 5;

  authenticated : boolean = false;


  constructor(
    private reviewService: ReviewService,
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog
    ) {}



  ngOnInit() {
    let movie_id = this.route.snapshot.paramMap.get('movie_id');
    this.tmdbService.getMovieDetail(movie_id).subscribe((movie: Movie_Detail) => {
      this.movie = movie;
      this.deleteDuplicate();
      this.getPeople();
      this.retrieveReviews();
    });
    this.authService.currentAuth.subscribe(authState =>  {
      this.authenticated = authState ? true : false;
    });
  }

  retrieveReviews(){
    this.reviewService.retrieveMovieReviews(this.movie.id.toString()).subscribe(reviews => {
      if(reviews) {
        this.reviews = reviews.reviews;
        console.log(this.reviews);
        this.averageScore = +reviews.averageScore.toFixed(1);
        console.log(this.averageScore);
        this.replyTreeControls = [];
        this.reviewsExpandControl = [];
        this.reviews.forEach(testReview => {
          this.replyTreeControls.push(this.getReplyTreeControl());
          this.reviewsExpandControl.push(false);
        });
      }
    });
  }



  deleteDuplicate(){
    let newCrew: Person[] = [];
    let newCast: Person[] = [];
    let flag = false;
    for(let i = 0; i < this.movie.casts.length; i++){
      for(let j = i+1; j < this.movie.casts.length; j++){
        if(this.movie.casts[i].name == this.movie.casts[j].name){
          flag = true;
          break;
        }
      }
      if(!flag){
        newCast.push(this.movie.casts[i]);
      }
      flag = false;
    }

    flag = false;

    for(let i = 0; i < this.movie.crews.length; i++){
      if (this.movie.crews[i].role === 'Director') {
        this.director = this.movie.crews[i].name;
      }

      for(let j = i+1; j < this.movie.crews.length; j++){
        if(this.movie.crews[i].name == this.movie.crews[j].name){
          flag = true;
          break;
        }
      }
      if(!flag){
        newCrew.push(this.movie.crews[i]);
      }
      flag = false;
    }

    this.movie.casts = newCast;
    this.movie.crews = newCrew;
  }


  getPeople(){
    this.crewFirstRow = [];
    this.castFirstRow = [];
    let crewCount = 0;
    let castCount = 0;
    this.crewRest = [];
    this.castRest = [];

    for(let i = 0; i < this.movie.crews.length; i++){
      if(crewCount < this.peopleCol){
        this.crewFirstRow.push(this.movie.crews[i]);
        crewCount++;
      }
      else{
        this.crewRest.push(this.movie.crews[i]);
      }
    }

    for (let i = 0; i < this.movie.casts.length; i++) {
      if (castCount < this.peopleCol) {
        this.castFirstRow.push(this.movie.casts[i]);
        castCount++;
      }
      else {
        this.castRest.push(this.movie.casts[i]);
      }
    }
  }


  // Add Review
  onAddReview() {
    if(this.authenticated){
      const addReviewDialog = this.dialog.open(AddReviewComponent, {
        width: '900px',
        data: {
          movie: this.movie,
        }
      });
      addReviewDialog.afterClosed().subscribe((review: Review) => {
        if (review) {
          // console.log(review);
        }
      });
    } else {
      this.dialog.open(LoginComponent, {
        width: '500px'
      });
    }
  }

  

  // Nested tree functions
  getReplyTreeControl() {
    return new NestedTreeControl<Reply>(node => node.replies);
  }

  getReplyDataSource(replies: Reply[]) {
    let dataSource = new MatTreeNestedDataSource<Reply> ();
    dataSource.data = replies;
    return dataSource;
  }

  whenNested(index: number, data: Reply) {
    return data.replies && data.replies.length > 0;
  }

  // Helper functions
  formateDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  starIcon(i: number, score: number) {
    if (i <= Math.floor(score)) {
      return 'star';
    } else if (i == Math.ceil(score)) {
      return 'star_half';
    } else {
      return 'star_outline';
    }
  }

}
