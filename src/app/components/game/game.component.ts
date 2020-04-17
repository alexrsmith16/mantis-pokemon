import { Component, OnInit } from "@angular/core";
import {GameServiceService} from './game-service.service';
// import {Observable} from 'rxjs/Rx';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  public pokemon;

  constructor(private _gameService: GameServiceService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
  this._gameService.getPokemon().subscribe(
    (data) => {
      this.pokemon = data.cards;
      console.log(data);
    },
    (err) => console.error(err),
    () => console.log("Done getting data.")
  );
  }
}
