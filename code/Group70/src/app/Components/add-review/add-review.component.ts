import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ReviewService } from 'src/app/Services/review.service';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  reviewRate = 4;

  reviewForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z\\s]+")]),
    comment: new FormControl('', [Validators.required]),
    user: new FormControl(''),
    score: new FormControl(''),
    date: new FormControl(''),
    replies: new FormControl('')
  });


  constructor(private dialogRef:MatDialogRef<AddReviewComponent>, private reviewService: ReviewService) {}

  ngOnInit() {
  }

  // form and data
  onSubmit() {
    let myDate = new Date().toString();
    this.reviewForm.patchValue({user: "Weiyu", score: this.reviewRate, date: myDate, replies: []});
    console.log(this.reviewForm.value);
    console.log(this.reviewForm.get('title').value);

    this.reviewService.createMovieReview(this.reviewForm.value, "1");
    this.closeDialog();

   
  }
  closeDialog(){
    this.dialogRef.close();
  }
  
}
