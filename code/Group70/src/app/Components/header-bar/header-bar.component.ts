import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../Components/login/login.component'
import { User, UserReview } from 'src/type';
import { UserService } from '../../Services/user.service'


@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  user: User = null;
  userID: string = null;

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private userService: UserService,
  ) { 
  }

  ngOnInit() {
  }

  login() {
    this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }

  getCurrentUser(){
    console.log("run1");
    if(this.authService.authenticated){
      this.userID = this.authService.currentUserId();
      console.log("run2", this.userID);
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

  getCurrentUserName(){
    return this.authService.currentUserName();
  }

  getCurrentUserID(){
    return this.authService.currentUserId();
  }

  isAuthenticated(){
    return this.authService.authenticated();
  }


  signOut(){
    this.authService.logout();
  }

}
