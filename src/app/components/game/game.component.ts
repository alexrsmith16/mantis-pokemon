import { Component, OnInit } from "@angular/core";
import {GameServiceService} from './game-service.service';
import {Card} from '../../models/card';
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
  public numOfPairs = 5

  constructor(private _gameService: GameServiceService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
  this._gameService.getPokemon().subscribe(
    (data: {cards: Card[]}) => {
      this.pokemon = data && data.cards ? data.cards : [];
      this.pokemon = this.pokemon.slice(this.ranNum, this.ranNum + this.numOfPairs)
      this.pokeArray = (this.pokemon)
      console.log(data);
    },
    // (err) => console.error(err),
    // () => console.log("Done getting data.")
  );
  }
}
