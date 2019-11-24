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

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
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
