import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reply } from 'src/type';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ReviewService } from 'src/app/Services/review.service';
import { UserService } from 'src/app/Services/user.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-add-reply',
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.scss']
})
export class AddReplyComponent implements OnInit {

  @Input() movieID: number;
  @Input() reviewID: string;
  @Input() replyID: string;

  hidden: boolean = true;

  authenticated: boolean = false;
  userName = null;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private reviewService: ReviewService,
    private dialog: MatDialog
  ) {
    this.authService.currentAuth.subscribe(authState =>  {
      this.authenticated = authState ? true : false;
      if(this.authenticated){
        this.getCurrentUserName(authState.uid);
      }
    });
   }

  ngOnInit() {
  }

  replyForm = new FormGroup({
    reply: new FormControl('', [Validators.required])
  });

  get replyControl(){ return this.replyForm.get('reply'); }

  onSubmit() {
    console.log('submit called');
    let myDate = new Date().toString();

    // Return the new review when closing the dialog
    const newReply: Reply = {
      id: this.createId(),
      user: this.userName,
      body: this.replyForm.get('reply').value,
      date: myDate,
      replies: []
    };
    console.log(newReply);
    this.reviewService.addReply(newReply, this.movieID.toString(), this.reviewID, this.replyID);
  }

  createId(): string {
    return this.reviewService.createId();
  }
  getCurrentUserName(uid: string){
    this.userService.retrieveUser(uid).subscribe(user => {
    this.userName = user.username;
  });
}

  showAddReply(){
    this.replyForm.reset();
    this.hidden = false;
  }
  close(){
    this.hidden = true;
  }
  onAddReply() {
    if(this.authenticated){
      this.showAddReply();
    } else {
      this.dialog.open(LoginComponent, {
        width: '500px'
      });
    }
  }
}
