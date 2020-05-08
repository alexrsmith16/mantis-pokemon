import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Setup } from 'src/app/models/setup';
import { UserService } from 'src/app/user.service';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  public setup: Setup;

  constructor(private http: HttpClient, private userService: UserService) { }

  getPokemon() {
    return this.http.get("https://api.pokemontcg.io/v1/cards/");
  }

  public setupGet(): Setup {
    return this.setup;
  }

  public setupSet(scope: any): void {
    let tempSetup: Setup = {
      difficulty: scope.difficulty,
      numOfCards: scope.numOfCards,
      players: []
    }
    for(let player of scope.players) {
      this.userService.getUserObservable(player).subscribe(user => {
        tempSetup.players.push(user);
        console.log(tempSetup.players);
      })
    }
    this.setup = scope;
  }
}
