import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie, Person, Review, Reply } from 'src/type';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class MovieDetailsPageComponent implements OnInit {


  reviewForm = new FormGroup({
    title : new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z\\s]+")]),
    comment : new FormControl('',[Validators.required])
  });


  movie: Movie;
  person1: Person;
  person2: Person;
  review: Review;
  reply: Reply;

  constructor(config: NgbRatingConfig, modalConfig: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;

     // customize default values of modals used by this component tree
     modalConfig.backdrop = 'static';
     modalConfig.keyboard = false;
     modalConfig.backdropClass = "backDrop";
     modalConfig.centered = true;
     modalConfig.size = "lg";
     modalConfig.scrollable = true;
  }


  ngOnInit() {
    // for test
    this.person1 = {
      name: "Alex",
      poster: "https://m.media-amazon.com/images/M/MV5BMTg2NDA4OTU3OV5BMl5BanBnXkFtZTgwNTQ5NzgxOTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      role: "Director"
    }

    this.person2 = {
      name: "Jim",
      poster: "https://m.media-amazon.com/images/M/MV5BMTg2NDA4OTU3OV5BMl5BanBnXkFtZTgwNTQ5NzgxOTE@._V1_UX214_CR0,0,214,317_AL_.jpg",
      role: "Director"
    }
    

    this.movie = {
      id: 1, 
      title: "Inception",
      genres: [18],
      casts: [this.person1, this.person2],
      crews: [this.person1, this.person2],
      poster: "https://img.moviepostershop.com/replicas-movie-poster-2019-1000778791.jpg",
      description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      release_date: "2019",
      rating: "18"
    }

    this.review = {
      movie_id: 1,
      user: "Weiyu Feng",
      score: 3,
      date: "11/15/2019",
      body: "Good",
      replies: []
    }

  }

  // modal
  open(content) {
    this.modalService.open(content);
  }



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
