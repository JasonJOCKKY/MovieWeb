import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PreviewComponent>) {}

  ngOnInit() {
  }

  onCloseClick(){
    this.dialogRef.close();
  }

}