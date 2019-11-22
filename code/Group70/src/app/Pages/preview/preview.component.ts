import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Movie {
  id: number,
  title: string,
  description: string,
  releaseDate: string,
  posterSrc: string
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie
    ) {
    }

  ngOnInit() {
  }

  onCloseClick(){
    this.dialogRef.close();
  }

}