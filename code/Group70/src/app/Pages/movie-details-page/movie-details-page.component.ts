import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person, Review, Reply, Movie_Detail } from 'src/type';
import { ReviewService } from 'src/app/Services/review.service';
import { TmdbServiceService } from 'src/app/Services/tmdb-service.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class MovieDetailsPageComponent implements OnInit {


  reviewRate = 4;

  reviewForm = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z\\s]+")]),
    comment: new FormControl('',[Validators.required]),
    rating: new FormControl('')
  });

  movie: Movie_Detail;
  reviews: Review[];

  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private reviewService: ReviewService,
    private tmdbService: TmdbServiceService,
    private route: ActivatedRoute
    ) {
     this.modalConfig.backdrop = 'static';
     this.modalConfig.keyboard = false;
     this.modalConfig.backdropClass = "backDrop";
     this.modalConfig.centered = true;
     this.modalConfig.size = "lg";
     this.modalConfig.scrollable = true;

  }


  ngOnInit() {
    const movie_id = this.route.snapshot.paramMap.get('movie_id');
    this.tmdbService.getMovieDetail(movie_id).subscribe((movie: Movie_Detail) => {
      this.movie = movie;
    });

    this.reviews = [];
  }

  // form and data
  onSubmit() {
    this.reviewForm.patchValue({rating: this.reviewRate});
    console.log(this.reviewForm.value);
    this.reviewService.createMovieReview(this.reviewForm.value, 1);
  }


  // modal
  open(content) {
    this.modalService.open(content);
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
