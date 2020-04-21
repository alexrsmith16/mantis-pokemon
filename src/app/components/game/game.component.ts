import { Component, OnInit } from "@angular/core";
import {GameServiceService} from './game-service.service';
import { style } from '@angular/animations';
import { JsonPipe } from '@angular/common';
// import {Observable} from 'rxjs/Rx';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  public pokeArray;
  public pokemon;
  public imgUrl = "https://jbrogan17.files.wordpress.com/2010/12/jared-pokemon-card-backside1.jpg";
  public ranNum = Math.floor(Math.random()*90);

  constructor(private _gameService: GameServiceService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
  this._gameService.getPokemon().subscribe(
    (data) => {
      this.pokemon = data.cards;
      this.pokemon = this.pokemon.slice(this.ranNum, this.ranNum + 5)
      this.pokeArray = (this.pokemon)
      console.log(this.pokeArray);
    },
    // (err) => console.error(err),
    // () => console.log("Done getting data.")
  );
  }
}
