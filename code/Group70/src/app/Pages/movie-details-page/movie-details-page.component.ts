import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Person, Review, Reply, Movie_Detail } from 'src/type';
import { ReviewService } from 'src/app/Services/review.service';

import { AddReviewComponent } from 'src/app/Components/add-review/add-review.component';

import { TmdbServiceService } from 'src/app/Services/tmdb-service.service';

import { ActivatedRoute } from '@angular/router';
import { CdkRowDef } from '@angular/cdk/table';


@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class MovieDetailsPageComponent implements OnInit {

  movie: Movie_Detail;
  reviews: Review[];
  crewFirstRow: Person[];
  castFirstRow: Person[];

  

 
  constructor(
    private modalService: NgbModal,
    private reviewService: ReviewService,
    private tmdbService: TmdbServiceService,
    private route: ActivatedRoute,
    private modalConfig: NgbModalConfig
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
      this.getFirstRow();
    });
  

    this.reviews = [];
  }

  getFirstRow(){
    this.crewFirstRow = [];
    this.castFirstRow = [];
    for(let i = 0; i < 6; i++){
      this.crewFirstRow.push(this.movie.crews[i]);
      this.castFirstRow.push(this.movie.casts[i]);
    }
    console.log(this.crewFirstRow);
    
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
