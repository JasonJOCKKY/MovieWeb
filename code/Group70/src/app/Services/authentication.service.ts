import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState: any = null;
  constructor(
    private afAuth: AngularFireAuth,
    public userService: UserService
    ) {
    this.afAuth.authState.subscribe(data => this.authState = data);
  }



  authenticated() : boolean {
    return this.authState !== null;
  }

  currentUserId() : string {
    return this.authenticated() ? this.authState.uid : null;
  }

  currentUserName() : string {
    return this.authenticated() ? this.authState.displayName : null;
  }


  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      cred => this.userService.addUser(cred.user.uid, cred.user.displayName)
    );
    
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
    console.log(this.afAuth.auth.currentUser);
  }

  async signUp(email: string, password: string, first: string) {
    try {
      const cred = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.userService.addUser(cred.user.uid, first);
      // const newUser: User = {
      //   first,
      //   email,
      //   uid: cred.user.uid
      // };
      // this.afs.doc<User>(`users/${cred.user.uid}`).set(newUser);
    } catch (err) {
      throw new Error('Could not create account');
    }
  }



}
