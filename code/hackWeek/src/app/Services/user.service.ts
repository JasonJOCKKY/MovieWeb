import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, UserReview, UserReview_D } from 'src/type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<User>;
  private userDocument: AngularFirestoreDocument<User>;
  private allUsers: Observable<User[]>;
  private user: Observable<User>;

  constructor(
    private afs: AngularFirestore,
    ) {
    this.userCollection = this.afs.collection<User>('Group70Users');
   }


  addUser(newUserID: string, newUsername: string){
    let newUser: User = {userID: newUserID, username: newUsername, userReviews: []};
    this.userCollection.doc(newUserID).set(newUser);
    console.log("User added to firebase");
  }

  //must check that user does not exist
  addUserWithGoogle(newUserID: string, newUsername: string){
    let newUser: User = {userID: newUserID, username: newUsername};
    this.userCollection.doc(newUserID).set(newUser, {merge: true});
    console.log("Google user added to firebase");
    /*
    var docRef = this.userCollection.doc(newUserID);
    docRef.get().toPromise().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          let newUser: User = {userID: newUserID, username: newUsername, userReviews: []};
          docRef.set(newUser);
          console.log("success?");
      }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
      */


/*
    let newUser: User = {userID: newUserID, username: newUsername, userReviews: []};
    let flag=false;
    this.retrieveUser(newUserID).subscribe(user => {
      if (flag || user) {
        console.log("User already exists!");
      }
      else{
        this.userCollection.doc(newUserID).set(newUser);
        console.log("User added to firebase");
        flag = true;
      }
    });
    */
  }

  retrieveUser(userID: string): Observable<User> {
    this.userDocument = this.userCollection.doc<User>(userID);
    this.user = this.userDocument.valueChanges();
    return this.user;
  }


  addUserReview(userID: string, newMovieID: string, newReviewID: string){
    let newUserReview: UserReview = {movieID: newMovieID, reviewID: newReviewID};
    let flag = true;
    this.retrieveUser(userID).subscribe(user => {
      if(flag){
      if(user){
        //user.userReviews.push(newUserReview);
        if(user.userReviews==null){
          console.log("reviews are null");
          user.userReviews = [];
        }
        else{
          console.log("reviews not null");
        }
        user.userReviews.push(newUserReview);
        this.userCollection.doc(userID).update(user);
      }
      else{
        console.log("invalid user id");
      }
      flag = false;
    }
    });
  }

}
