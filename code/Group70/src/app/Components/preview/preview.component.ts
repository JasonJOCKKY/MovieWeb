import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReviewService} from "../../Services/review.service"
import { Movie, Review } from 'src/type';
import { Observable, Subject } from 'rxjs';
import { _MatTabBodyBase } from '@angular/material';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(
    public reviewService: ReviewService,
    public dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie
    ) {
      
  }

  reviews: Review[] = [{user: "bob", score: 5, date: "2019-11-24", title: "good film!", comment: "I liked this film", replies: [] },
    {user: "bob2", score: 5, date: "2019-11-24", title: "good film!", comment: "I liked this film", replies: [] },
    {user: "bob3", score: 5, date: "2019-11-24", title: "good film!", comment: "I liked this film", replies: [] },
    {user: "bob4", score: 5, date: "2019-11-24", title: "good film!", comment: "I liked this film", replies: [] },
    {user: "bob5", score: 5, date: "2019-11-24", title: "good film!", comment: "I liked this film", replies: [] }
  ];
  review: Review;

  ngOnInit() {
/*
    this.reviewService.retrieveMovieReview(this.movie.id.toString())
    .subscribe(review =>{
      this.review = review as Review
    })
    */
  }

  onCloseClick(){
    this.dialogRef.close();
  }

}