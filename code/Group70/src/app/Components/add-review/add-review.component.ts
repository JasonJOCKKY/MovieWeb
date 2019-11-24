import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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


  constructor() {}

  ngOnInit() {
  }

  // form and data
  onSubmit() {
    let myDate = new Date().toString();
    this.reviewForm.patchValue({user: "Weiyu", score: this.reviewRate, date: myDate, replies: []});
    console.log(this.reviewForm.value);
   //this.reviewService.createMovieReview(this.reviewForm.value, 1);
  }

}
