import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Person, Review, Reply, Movie_Detail } from 'src/type';
import { ReviewService } from 'src/app/Services/review.service';

import { AddReviewComponent } from 'src/app/Components/add-review/add-review.component';

import { TmdbServiceService } from 'src/app/Services/tmdb-service.service';

import { ActivatedRoute } from '@angular/router';
import { CdkRowDef } from '@angular/cdk/table';
import { BreadcrumbModule } from 'angular-bootstrap-md';
import { Movie } from '../preview/preview.component';


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
  crewRest: Person[];
  castRest: Person[];

  

 
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
      this.deleteDuplicate();
      this.getPeople();
    });
  

    this.reviews = [];
  }

  deleteDuplicate(){
    let newCrew: Person[] = [];
    let newCast: Person[] = [];
    let flag = false;
    for(let i = 0; i < this.movie.casts.length; i++){
      for(let j = i+1; j < this.movie.casts.length; j++){
        if(this.movie.casts[i].name == this.movie.casts[j].name){
          flag = true;
          break;
        }
      }
      if(!flag){
        newCast.push(this.movie.casts[i]);
      }
      flag = false;
    }

    flag = false;

    for(let i = 0; i < this.movie.crews.length; i++){
      for(let j = i+1; j < this.movie.crews.length; j++){
        if(this.movie.crews[i].name == this.movie.crews[j].name){
          flag = true;
          break;
        }
      }
      if(!flag){
        newCrew.push(this.movie.crews[i]);
      }
      flag = false;
    }

    this.movie.casts = newCast;
    this.movie.crews = newCrew;
  }


  getPeople(){
    this.crewFirstRow = [];
    this.castFirstRow = [];
    let crewCount = 0;
    let castCount = 0;
    this.crewRest = [];
    this.castRest = [];

    for(let i = 0; i < this.movie.crews.length; i++){
      if(this.movie.crews[i].poster!=null){
        if(crewCount < 6){
          this.crewFirstRow.push(this.movie.crews[i]);
          crewCount++;
        }
        else{
          this.crewRest.push(this.movie.crews[i]);
        } 
      }
    }

    for (let i = 0; i < this.movie.casts.length; i++) {
      if (this.movie.casts[i].poster != null) {
        if (castCount < 6) {
          this.castFirstRow.push(this.movie.casts[i]);
          castCount++;
        }
        else {
          this.castRest.push(this.movie.casts[i]);
        }
      }
    }
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
