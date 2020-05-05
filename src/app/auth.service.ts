import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user'

import { auth, firestore } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } 
          else {
            return of(null);
          }
        })
      )
    }

    googleSignin2() {
      const provider = new auth.GoogleAuthProvider();
      // return of(this.afAuth.signInWithPopup(provider)).pipe(
      //     switchMap(googleUser => {
      //       console.log(googleUser);
      //       return this.afs.doc<User>(`users/${googleUser["uid"]}`).valueChanges();
      //     })
      // )
      this.afAuth.signInWithPopup(provider).then(googleUser => {
        console.log(googleUser);
        this.afs.doc<User>(`users/${googleUser.user.uid}`).valueChanges().pipe(take(1)).subscribe(user => {
          this.updateUserData(user, googleUser.user);
        });
      })
    }

    // async googleSignin() {
    //   const provider = new auth.GoogleAuthProvider();
    //   const credential = await this.afAuth.signInWithPopup(provider);
    //   // this.router.navigate(['/setup']);
    //   return this.updateUserData(credential.user);
    // }
  
    private updateUserData(user, googleUser) {
        let collection = this.afs.collection('users');
        if (!user) {
        user = { 
          uid: googleUser.uid, 
          email: googleUser.email, 
          displayName: googleUser.displayName, 
          photoURL: googleUser.photoURL,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0,
          playersLost: [],
          playersBeat: []
        }
        collection.doc(user.uid).set(user);
      }
      this.router.navigate(['/account']);
    }
  
    async signOut() {
      await this.afAuth.signOut();
      this.router.navigate(['/']);
    }

}
