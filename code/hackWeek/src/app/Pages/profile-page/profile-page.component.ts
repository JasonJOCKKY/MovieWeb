import { Component, OnInit } from '@angular/core';
import { Review, User, UserReview } from '../../../type';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  reviews: Review[] = [];
  username: string = "";
  userID: string;
  user: User;

  constructor(
    public authService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { 
  }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('user_id');
    this.user = {userID:this.userID, username:"", userReviews:[] };
    this.userService.retrieveUser(this.userID).subscribe(user=>{
      if(user){
        this.user = user;
        
      }
      else{
        console.log("no user");
      }
    });
  }

}
