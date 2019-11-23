import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie, Person, Review, Reply, Movie_Detail } from 'src/type';
import { ReviewService } from 'src/app/Services/review.service';
import { DatePipe } from '@angular/common';
import { AddReviewComponent } from 'src/app/Components/add-review/add-review.component';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal, DatePipe]
})
export class MovieDetailsPageComponent implements OnInit {


  reviewRate = 4;

  movie: Movie_Detail;



  reviewForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z\\s]+")]),
    comment: new FormControl('',[Validators.required]),
    user: new FormControl(''),
    score: new FormControl(''),
    date: new FormControl(''),
    replies: new FormControl('')
  });

  
  constructor(private config: NgbRatingConfig, private modalConfig: NgbModalConfig, private modalService: NgbModal, private datePipe: DatePipe, private reviewService: ReviewService) {
    // customize default values of ratings used by this component tree
    // config.max = 5;
    // config.readonly = true;

     // customize default values of modals used by this component tree
     this.modalConfig.backdrop = 'static';
     this.modalConfig.keyboard = false;
     this.modalConfig.backdropClass = "backDrop";
     this.modalConfig.centered = true;
     this.modalConfig.size = "lg";
     this.modalConfig.scrollable = true;
     
  }


  ngOnInit() {

  }

  // retrieve data
  retrieveData(){
    this.reviewService.retrieveMovieReview(1);
  }

  // form and data
  onSubmit() {

    let myDate = new Date().toString();
    myDate = this.datePipe.transform(myDate, 'yyyy-MM-dd');
    this.reviewForm.patchValue({user: "Weiyu", score: this.reviewRate, date: myDate, replies: []});
    console.log(this.reviewForm.value);
   //this.reviewService.createMovieReview(this.reviewForm.value, 1);
  }


  // modal
  open() {
    const modalRef = this.modalService.open(AddReviewComponent);
  }


  // rating chart
  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55]}
  ];

  public chartLabels: Array<any> = ['1', '2', '3', '4', '5'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  

}
