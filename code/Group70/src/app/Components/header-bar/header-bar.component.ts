import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../Components/login/login.component'
import { User, UserReview } from 'src/type';


@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  user: User;
  userName: string = null;
  userID:string = null;

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) { 
    //this.userID = this.authService.currentUserId;
  }

  ngOnInit() {
  }

  login() {
    this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }

  getCurrentUser(){
    if(this.authService.authState){
      this.userName = this.authService.authState.displayName;
      this.userID = this.authService.authState.uid;
    }
    return this.authService.authState;
  }


  signOut(){
    this.authService.logout();
  }

}
