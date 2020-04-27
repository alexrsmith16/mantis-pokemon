import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  public users$: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.userService.getUsersObservable();
  }

}