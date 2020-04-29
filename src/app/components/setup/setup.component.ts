import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { GameServiceService } from "../game/game-service.service";
import { User } from '../../models/user'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  public users$: Observable<User[]>;
  public numOfCards;
  public maxPairs = 10;
  public selectedValue;
  public options = [
    {
      value: 1,
      name : "1"
    },
    {
      value: 2,
      name : "2"
    },
    {
      value: 3,
      name : "3"
    },
    {
      value: 4,
      name : "4"
    }
  ]
  public gameComp = {
    numOfCards: "",
    numOfPlayers: ""
  }

  constructor(private userService: UserService, private _gameService: GameServiceService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.userService.getUsersObservable();
  }

  setCards(event: any) {
    if (event.target.value !== null && event.target.value <= this.maxPairs) {
      this.numOfCards = event.target.value;
    }
  }

  playGame() {
    this.gameComp.numOfCards = this.numOfCards;
    this.gameComp.numOfPlayers = this.selectedValue;
    console.log(this.gameComp)
    this._gameService.setupSet(this.gameComp);
  }

}