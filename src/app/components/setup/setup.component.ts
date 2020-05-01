import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { GameServiceService } from "../game/game-service.service";
import { User } from '../../models/user'
import { Setup } from 'src/app/models/setup'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  public users$: Observable<User[]>;
  public numOfCards;
  public maxPairs = 10;
  public selectedValue = 1;
  public playerAmount: number;
  public player1;
  public player2;
  public player3;
  public player4;
  public optionsMatches = [
    {
      value: 4,
      name: "4"
    },
    {
      value: 5,
      name: "5"
    },
    {
      value: 6,
      name: "6"
    },
    {
      value: 7,
      name: "7"
    },
    {
      value: 8,
      name: "8"
    },
    {
      value: 9,
      name: "9"
    },
    {
      value: 10,
      name: "10"
    }
  ]
  public options = [
    {
      value: 1,
      name: "1"
    },
    {
      value: 2,
      name: "2"
    },
    {
      value: 3,
      name: "3"
    },
    {
      value: 4,
      name: "4"
    }
  ]
  public playerArray = [
    {
      name: "Example 1"
    },
    {
      name: "Example 2"
    },
    {
      name: "Example 3"
    },
    {
      name: "Example 4"
    }
  ]
  public tempPlayerArray;
  public gameComp: Setup = {
    numOfCards: 0,
    numOfPlayers: []
  };

  constructor(private userService: UserService, private _gameService: GameServiceService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.userService.getUsersObservable();
  }

  // setPlayerSelect(value: number) {
  //   document.getElementById('playerSelection').innerHTML = '';
  //   for (let i = 0; i < value; i++) {
  //     document.getElementById('playerSelection').innerHTML += `<div>Player ${i + 1}:   <select id='playerNumber${i+1}><option value='example1'>Example 1</option><option value='example2'>Example 2</option><option value='example3'>Example 3</option><option value='example4'>Example 4</option></select><div>`;
  //   }
  // }

  playGame() {
    console.log(this.numOfCards);
    this.gameComp.numOfCards = this.numOfCards;
    this.gameComp.numOfPlayers = this.tempPlayerArray;
    //its passing the original array, not the array that I changed with the select HTML:31-35, (NOT WORKING) --JOHN
    this._gameService.setupSet(this.gameComp);
    console.log(this.gameComp)
  }

  playerNumChange(value) {
    this.selectedValue = +value;
    // console.log(typeof this.selectedValue);
    this.tempPlayerArray = this.playerArray.slice(0, value);
  }
}