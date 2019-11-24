import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Movie_Detail, Review } from 'src/type';


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
    user: new FormControl(''),
    score: new FormControl(5),
    date: new FormControl(''),
    replies: new FormControl('')
  });


  constructor(
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
    // this.reviewForm.patchValue({user: "Weiyu", score: this.reviewForm.get['score'].value, date: myDate, replies: []});
    // console.log(this.reviewForm.value);
    // console.log(this.reviewForm.get('title').value);

    //this.reviewService.createMovieReview(this.reviewForm.value, 1);

    // Return the new review when closing the dialog
    const newReview: Review = {
      user: 'random user',
      // score: this.reviewForm.get['score'].value,
      score: this.reviewForm.get('score').value,
      date: myDate,
      title: this.reviewForm.get('title').value,
      comment: this.reviewForm.get('comment').value,
      replies: []
    }
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
}
