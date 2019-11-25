import { Component, OnInit } from '@angular/core';
import { Review } from '../../../type';
import { AuthenticationService } from '../../Services/authentication.service'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  reviews: Review[];
  username: string;

  constructor(
    public authService: AuthenticationService,
  ) { 
    this.reviews = [];
    this.username = "Test Name";
  }

  ngOnInit() {
  }

}
