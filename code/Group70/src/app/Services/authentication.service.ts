import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState: any = null;
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(data => this.authState = data);
  }

  get authenticated() : boolean {
    return this.authState !== null;
  }

  get currentUserId() : string {
    return this.authenticated ? this.authState.uid : null;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
