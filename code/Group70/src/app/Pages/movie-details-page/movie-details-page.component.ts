import { Component, OnInit } from '@angular/core';

import { Person, Reply, Movie_Detail, Reviews, Review } from 'src/type';
import { ReviewService } from 'src/app/Services/review.service';

import { AddReviewComponent } from 'src/app/Components/add-review/add-review.component';
import { TmdbServiceService } from 'src/app/Services/tmdb-service.service';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MatDialog, MatTreeNestedDataSource } from '@angular/material';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { NestedTreeControl } from '@angular/cdk/tree';



@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})

export class MovieDetailsPageComponent implements OnInit {

  movie: Movie_Detail;

  reviewsExpandControl: Boolean[] = [];
  replyTreeControls: NestedTreeControl<Reply>[] = [];
  reviews: Review[];

  crewFirstRow: Person[];
  castFirstRow: Person[];
  crewRest: Person[];
  castRest: Person[];
  peopleCol = 5;

  // Test Reviews
  testReviews: Review[] = [
    {
      user: 'User1',
      score: 3,
      date: '2019-12-18',
      title: 'Title1',
      comment: 'Turned it up should no valley cousin he. Speaking numerous ask did horrible packages set. Ashamed herself has distant can studied mrs. Led therefore its middleton perpetual fulfilled provision frankness. Small he drawn after among every three no. All having but you edward genius though remark one.',
      replies: []
    },
    {
      user: 'User2',
      score: 5,
      date: '2019-1-18',
      title: 'Title2',
      comment: 'Cause dried no solid no an small so still widen. Ten weather evident smiling bed against she examine its. Rendered far opinions two yet moderate sex striking. Sufficient motionless compliment by stimulated assistance at. Convinced resolving extensive agreeable in it on as remainder. Cordially say affection met who propriety him. Are man she towards private weather pleased. In more part he lose need so want rank no. At bringing or he sensible pleasure. Prevent he parlors do waiting be females an message society. ',
      replies: [
        {
          user: 'User 999',
          body: 'Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of. We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. ',
          replies: [
            {
              user: 'User 2000',
              body: 'Now indulgence dissimilar for his thoroughly has terminated. Agreement offending commanded my an. Change wholly say why eldest period. Are projection put celebrated particular unreserved joy unsatiable its. In then dare good am rose bred or. On am in nearer square wanted. ',
              replies: []
            }
          ]
        },
        {
          user: 'User 998',
          body: 'Excited him now natural saw passage offices you minuter. At by asked being court hopes. Farther so friends am to detract. Forbade concern do private be. Offending residence but men engrossed shy. Pretend am earnest offered arrived company so on. Felicity informed yet had admitted strictly how you. ',
          replies: []
        }
      ]
    }
  ];


  constructor(
    private reviewService: ReviewService,
    private tmdbService: TmdbServiceService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog
    ) {}



  ngOnInit() {
    let movie_id = this.route.snapshot.paramMap.get('movie_id');
    this.tmdbService.getMovieDetail(movie_id).subscribe((movie: Movie_Detail) => {
      this.movie = movie;
      this.deleteDuplicate();
      this.getPeople();
      this.retrieveReviews();
    });
  }

  retrieveReviews(){
    this.reviewService.retrieveMovieReviews(this.movie_id).subscribe(reviews => {
      if(reviews) {
        this.reviews = reviews.reviews;
        this.replyTreeControls = [];
        this.reviewsExpandControl = [];
        this.reviews.forEach(testReview => {
          this.replyTreeControls.push(this.getReplyTreeControl());
          this.reviewsExpandControl.push(false);
        });
      }
    });
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
      if(crewCount < this.peopleCol){
        this.crewFirstRow.push(this.movie.crews[i]);
        crewCount++;
      }
      else{
        this.crewRest.push(this.movie.crews[i]);
      }
    }

    for (let i = 0; i < this.movie.casts.length; i++) {
      if (castCount < this.peopleCol) {
        this.castFirstRow.push(this.movie.casts[i]);
        castCount++;
      }
      else {
        this.castRest.push(this.movie.casts[i]);
      }
    }
  }


  // Add Review
  onAddReview() {
    if(this.authService.authState){
      const addReviewDialog = this.dialog.open(AddReviewComponent, {
        width: '900px',
        data: {
          movie: this.movie,
        }
      });
      addReviewDialog.afterClosed().subscribe((review: Review) => {
        if (review) {
          // console.log(review);
        }
      });
    } else {
      this.dialog.open(LoginComponent, {
        width: '500px'
      });
    }
  }

  // Nested tree functions
  getReplyTreeControl() {
    return new NestedTreeControl<Reply>(node => node.replies);
  }

  getReplyDataSource(replies: Reply[]) {
    let dataSource = new MatTreeNestedDataSource<Reply> ();
    dataSource.data = replies;
    return dataSource;
  }

  whenNested(index: number, data: Reply) {
    return data.replies && data.replies.length > 0;
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
