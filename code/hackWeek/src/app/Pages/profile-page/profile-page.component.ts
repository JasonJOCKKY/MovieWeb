import { Component, OnInit } from '@angular/core';
import { Review, User, UserReview } from '../../../type';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  userName: string = "";
  userID: string;
  reviews: Review[] = [];
  authenticated: boolean = false;

  constructor(
    public authService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { 
  }

  ngOnInit() {
    this.authService.authState.subscribe(authState =>  {
      this.authenticated = authState ? true : false;
      if(this.authenticated){
        this.getCurrentUserName(authState.uid);
      }
    });
  }

  getCurrentUserName(uid: string){
    this.userService.retrieveUser(uid).subscribe(user => {
      this.userName = user.username;
    });
  }
}
