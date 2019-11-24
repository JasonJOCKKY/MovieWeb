import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReviewService} from "../../Services/review.service"
import { Movie, Review } from 'src/type';

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

  reviews: Review[];

  ngOnInit() {
  }

  onCloseClick(){
    this.dialogRef.close();
  }

}