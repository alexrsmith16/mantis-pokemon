import { Component, OnInit, ViewChild } from "@angular/core";
import {GameServiceService} from './game-service.service';
import {Card} from '../../models/card';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import * as _ from "lodash";


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
  public numOfPairs = 8
  public flipped = true;
  // @ViewChild("myLabel") lab;

  constructor(private _gameService: GameServiceService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
  this._gameService.getPokemon().subscribe(
    (data: {cards: Card[]}) => {
      this.pokemon = data && data.cards ? data.cards : [];

      let randomSet = this.pokemon.slice(this.ranNum, this.ranNum + this.numOfPairs);
      // let secondSet = randomSet.slice();
      let secondSet = _.cloneDeep(randomSet);
      secondSet.forEach(element => {
        element.id = "2-" + element.id;
      });

      this.pokeArray = randomSet.concat(secondSet);
      console.log(this.pokeArray);

      this.pokeArray.forEach(element => {
        element.flipped = true;
      });
    },
    (err) => console.error(err),
    () => console.log("Done getting data.")
  );
  }

  // showOrHideManually() {
  //   this.flipped = !this.flipped;
  //   if(this.flipped) {
  //     this.lab.nativeElement.classList.add("show");
  //     this.lab.nativeElement.classList.remove("hide");
  //   } else {
  //     this.lab.nativeElement.classList.add("hide");
  //     this.lab.nativeElement.classList.remove("show");
  //   }
  // }
}
