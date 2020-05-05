import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public playersBeat: Array<User> = [];
  public playersLost: Array<User> = [];
  public currentUser: User;

  constructor(
    public auth: AuthService,
    public userService: UserService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) {
      // this.afAuth.authState.subscribe(user => {
      //   this.currentUser = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      // })
    }

  ngOnInit(): void {
    this.afAuth.authState.pipe(
      switchMap(googleUser => {
        return this.afs.doc<User>(`users/${googleUser.uid}`).valueChanges();
      }),
      tap(user => {
        this.currentUser = user;
      })
    ).subscribe()

    setTimeout(() => {
      this.currentUser.playersBeat.forEach(player => {
        this.afs.doc<User>(`users/${player}`).valueChanges().subscribe(value => {
          this.playersBeat.push(value);
        });
      })
      this.currentUser.playersLost.forEach(player => {
        this.afs.doc<User>(`users/${player}`).valueChanges().subscribe(value => {
          this.playersLost.push(value);
        });
      })
    }, 2000)
  }
}
