import { Component, OnInit } from '@angular/core';
import { Review, User, UserReview, UserReview_D, Movie_Detail, Movie } from '../../../type';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReviewService } from 'src/app/Services/review.service';
import { TmdbService } from 'src/app/Services/tmdb-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userName: string = "";

  authenticated: boolean = false;

  userReviews: UserReview_D[] = [];


  constructor(
    public authService: AuthenticationService,
    private userService: UserService,
    private reviewService: ReviewService,
    private tmdbService: TmdbService
  ) {
  }

  ngOnInit() {
    this.authService.currentAuth.subscribe(authState => {
      this.authenticated = authState ? true : false;
      if (this.authenticated) {
        this.userService.retrieveUser(authState.uid).subscribe(user => {
          this.getCurrentUserName(user);
          this.getReviews(user);
        });
      }
    });
  }

  getCurrentUserName(user: User) {
    this.userName = user.username;
  }

  getReviews(user: User) {
    for (let i = 0; i < user.userReviews.length; i++) {

      this.reviewService.retrieveMovieReviews(user.userReviews[i].movieID).subscribe(result => {

        if (result) {
          this.tmdbService.getMovieDetail(user.userReviews[i].movieID).subscribe((movie: Movie_Detail) => {

            let oneUserReview:UserReview_D = {
              reviewMovie: null,
              review: null
            };

            for (let j = 0; j < result.reviews.length; j++) {
              if (user.userReviews[i].reviewID == result.reviews[j].id) {
                oneUserReview.reviewMovie = movie;
                oneUserReview.review = result.reviews[j];
                break;
              }
            }

            this.userReviews.push(oneUserReview);
          });   
        }

      });

    }
  }

  formateDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

}
