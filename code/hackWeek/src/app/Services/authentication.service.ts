import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/type'; 
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: Observable<User>;
  currentAuth: Observable<firebase.User | null>;  
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public userService: UserService
    ) {
    this.userCollection = this.afs.collection<User>('Group70Users');
    this.currentAuth = this.afAuth.authState;
    this.currentUser = this.currentAuth.pipe(
      switchMap((cred: firebase.User | null) => {
        if (cred) {
          return this.userCollection.doc<User>(cred.uid).valueChanges();
        } else {
          return of(undefined);
        }
      }),
      map(userDetails => userDetails as User)
    );
  }

  async loginWithGoogle() {
    try {
      const cred = await this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider());
      
      this.userService.addUserWithGoogle(cred.user.uid, cred.user.displayName);
      
     /*
      this.userCollection.doc(cred.user.uid).delete().then(function() {
        console.log("Document successfully deleted!");
       }).catch(function(error) {
        console.error("Error removing document: ", error);
       });
       */

    } catch (err) {
      throw new Error('Could not create account/login google');
    }
    /*
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      cred => this.userService.addUserWithGoogle(cred.user.uid, cred.user.displayName)
    );
    */
    //const cred = await this.afAuth.auth.signInWithPopup( new auth.GithubAuthProvider());
    //this.userService.addUserWithGoogle(cred.user.uid, cred.user.displayName);
  
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw new Error('Could not login');
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    location.reload();
    console.log(this.afAuth.auth.currentUser);
  }

  async signUp(email: string, password: string, first: string) {
    try {
      const cred = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      //this.userService.addUser(cred.user.uid, first);
      this.userService.addUser(cred.user.uid, first);
    } catch (err) {
      throw new Error('Could not create account');
    }
  }

}
