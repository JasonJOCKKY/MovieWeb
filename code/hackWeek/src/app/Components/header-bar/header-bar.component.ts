import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../Components/login/login.component'
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  userName: string;
  authenticated: boolean = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    
    this.authService.authState.subscribe(authState =>  {
      console.log("run3");
      this.authenticated = authState ? true : false;
      if(this.authenticated){
        this.getCurrentUserName(authState.uid);
      }
    });
  }

  login() {
    this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }

  getCurrentUserName(uid: string){
    this.userService.retrieveUser(uid).subscribe(user => {
      this.userName = user.username;
    });
  }

  signOut(){
    this.authService.logout();
  }

}
