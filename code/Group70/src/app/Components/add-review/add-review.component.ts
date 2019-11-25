import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ReviewService } from 'src/app/Services/review.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Movie_Detail, Review, Reviews } from 'src/type';
import { AuthenticationService } from 'src/app/Services/authentication.service';



@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  movie: Movie_Detail;
  displayScore = 5;

  reviewForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z\\s]+")]),
    comment: new FormControl('', [Validators.required]),
    score: new FormControl(5)
  });


  constructor(
    private authService: AuthenticationService,
    private reviewService: ReviewService,
    private dialogRef:MatDialogRef<AddReviewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}


  ngOnInit() {
    this.movie = this.data['movie'];
  }

  // form and data
  onSubmit() {
    console.log('submit called');
    let myDate = new Date().toString();

    // Return the new review when closing the dialog
    const newReview: Reviews = {
      reviews: [{
        id: this.createId(),
        user: this.getCurrentUserName(),
        score: this.reviewForm.get('score').value,
        date: myDate,
        title: this.reviewForm.get('title').value,
        comment: this.reviewForm.get('comment').value,
        replies: []
      }]
    }
    this.reviewService.addMovieReview(newReview, this.movie.id.toString());
    this.dialogRef.close(newReview);
    
  }

  // Score functions
  setDisplayScore(score: number) {
    this.displayScore = score;
  }

  resetDisplayScore() {
    this.displayScore = this.reviewForm.get('score').value;
  }

  setScore(score: number) {
    this.reviewForm.get('score').setValue(score);
  }

  createId(): string{
    return this.reviewService.createId();
  }

  getCurrentUserName(): string{
    return this.authService.currentUserName();
  }

}
