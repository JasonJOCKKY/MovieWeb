import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewService } from "../../Services/review.service"
import { Movie, Review, Reviews } from 'src/type';
import { _MatTabBodyBase } from '@angular/material';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(
    public reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.movie = data.movie;
    this.reviewService.retrieveMovieReviews(this.movie.id.toString()).subscribe((result: Reviews) => {
      this.isLoading = false;
      if(result){
        this.reviews = result.reviews;
      }
    });
  }

  isLoading: boolean = true;
  movie: Movie;
  reviews: Review[] = [];


  ngOnInit() {

  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }
}
