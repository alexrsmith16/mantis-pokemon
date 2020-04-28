import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { User } from './models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userRef: AngularFirestoreDocument<User>;

  private usersRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.userRef = this.db.doc<User>('users/BVRwgxZl5wURlAwNjktM1bvLjb62');
    this.usersRef = this.db.collection<User>('users');
  }

  getUserObservable(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`)
      .valueChanges()
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getUsersObservable(): Observable<User[]> {
    return this.usersRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<User>[]): User[] => {
          return items.map((item: DocumentChangeAction<User>): User => {
            return {
              uid: item.payload.doc.id,
              displayName: item.payload.doc.data().displayName,
              email: item.payload.doc.data().email,
              photoURL: item.payload.doc.data().photoURL,
              gamesPlayed: item.payload.doc.data().gamesPlayed,
              gamesWon: item.payload.doc.data().gamesWon,
              gamesLost: item.payload.doc.data().gamesLost,
              playersLost: item.payload.doc.data().playersLost,
              playersBeat: item.payload.doc.data().playersBeat
            };
          });
        }),
        catchError(this.errorHandler)
      );
  }

  saveUser(user: User) {
    return this.usersRef.add(user)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }


  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }
}
