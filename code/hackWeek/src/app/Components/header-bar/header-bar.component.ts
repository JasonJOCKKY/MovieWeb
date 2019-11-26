import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../Components/login/login.component'


@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {


  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  login() {
    this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }

  getCurrentUserName(){
    return this.authService.currentUserName();
  }

  isAuthenticated(){
    return this.authService.authenticated();
  }


  signOut(){
    this.authService.logout();
  }

}
