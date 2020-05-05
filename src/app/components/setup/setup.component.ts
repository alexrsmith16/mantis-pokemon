import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";
import { Observable } from "rxjs";
import { GameServiceService } from "../game/game-service.service";
import { User } from "../../models/user";
import { Setup } from "src/app/models/setup";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";

@Component({
  selector: "app-setup",
  templateUrl: "./setup.component.html",
  styleUrls: ["./setup.component.scss"],
})
export class SetupComponent implements OnInit {

  public users$: Observable<User[]> = this.userService.getUsersObservable();
  public numOfCards;
  public maxPairs = 10;
  public selectedValue = 0;
  public playerAmount: number;
  public tempPlayerNamesArray = [];
  public playerNamesArray = [
    {
      name: "",
      score: 0,
    }, 
    {
      name: "",
      score: 0,
    },
    {
      name: "",
      score: 0,
    },
    {
      name: "",
      score: 0,
    }, 
   ];
  public optionsMatches = [
    {
      value: 4,
      name: "4",
    },
    {
      value: 5,
      name: "5",
    },
    {
      value: 6,
      name: "6",
    },
    {
      value: 7,
      name: "7",
    },
    {
      value: 8,
      name: "8",
    },
    {
      value: 9,
      name: "9",
    },
    {
      value: 10,
      name: "10",
    },
  ];
  public options = [
    {
      value: 1,
      name: "1",
    },
    {
      value: 2,
      name: "2",
    },
    {
      value: 3,
      name: "3",
    },
    {
      value: 4,
      name: "4",
    },
  ];
  public playerArray = [
    {
      name: "Example 1",
    },
    {
      name: "Example 2",
    },
    {
      name: "Example 3",
    },
    {
      name: "Example 4",
    },
  ];
  public tempPlayerArray;
  public gameComp: Setup = {
    firebaseObject: [{
      displayName: "",
      email: "",
      gamesLost: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      photoURL: "",
      playersBeat: [],
      playersLost: [],
      uid: "",
    }],
    numOfCards: 0,
    numOfPlayers: [],
    playerNames: [],
    difficulty: "easy",
  };

  constructor(
    private userService: UserService,
    private _gameService: GameServiceService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.users$.subscribe(users => { console.log(users) })
  }

  getUsers() {
    this.users$ = this.userService.getUsersObservable();
  }

  playGame() {
    for (let i = 0; i < this.playerNamesArray.length; i++) {
      if (this.playerNamesArray[i] === null) {
        this.playerNamesArray.splice(i, 5);
        break;
      }
    }
    // this.gameComp.firebaseObject = this.users$;
    this.gameComp.numOfCards = this.numOfCards;
    this.gameComp.numOfPlayers = this.tempPlayerArray;
    for (let index = 0; index < this.tempPlayerNamesArray.length; index++) {
      this.playerNamesArray[index].name = this.tempPlayerNamesArray[index];
    }
    this.gameComp.playerNames = this.playerNamesArray;
    this._gameService.setupSet(this.gameComp);
    console.log(this.users$);
  }

  playerNumChange(value) {
    this.selectedValue = +value;
    this.tempPlayerArray = this.playerArray.slice(0, value);
  }
}
