import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {GameServiceService} from './game-service.service';
import {Card} from '../../models/card';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import * as _ from "lodash";
import { empty } from 'rxjs';


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
  public counter;
  public check = 0;
  public matched = [];
  public ctr;
  public temp;
  public index;
  public score = 0;
  public fails = 0;
  public isDisabled: boolean = false;

  constructor(private _gameService: GameServiceService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this._gameService.getPokemon().subscribe(
      (data: {cards: Card[]}) => {
        this.pokemon = data && data.cards ? data.cards : [];

        let randomSet = this.pokemon.slice(this.ranNum, this.ranNum + this.numOfPairs);
        let secondSet = _.cloneDeep(randomSet);

        this.pokeArray = randomSet.concat(secondSet);
        console.log(this.pokeArray);
        
        this.ctr = this.pokeArray.length;
        while (this.ctr > 0) {
          this.index = Math.floor(Math.random() * this.ctr);
          this.ctr--;
          this.temp = this.pokeArray[this.ctr];
          this.pokeArray[this.ctr] =  this.pokeArray[this.index];
          this.pokeArray[this.index] = this.temp;
        }

        console.log(this.pokeArray);

        this.pokeArray.forEach(element => {
          element.flipped = true;
        });
      },
      (err) => console.error(err),
      () => console.log("Done getting data.")
    );
  }

  resetGame() {
    this.getPokemon();
    this.score = 0;
    this.fails = 0;
  }

  isSelected(card) {
    if (this.isDisabled) {
      return
    }
    card.flipped = !card.flipped; 
    // console.log(this.check);
    // if (this.check >= 1) {
    //   this.isDisabled = true;
    //   this.check = 0;
    // } else {
    //   this.check++;
    // }
    this.counter = 0;
    this.matched = [];
    this.pokeArray.forEach(card => {
      if (card.flipped === false) {
        this.counter += 1;
      }
    });
    console.log(this.counter);
    if (this.counter >= 2) {
      this.isDisabled = true;
      this.pokeArray.forEach(card => {
        if (card.flipped === false) {
          this.matched.push(card.id);
        }
      });
      this.pokeArray.forEach(card => {
        if (card.flipped === false) {
          this.matched.push(card.id);
        }
      });
      console.log(this.matched[0], this.matched[3], this.matched);
      setTimeout(() => {
        if (this.matched[0] === this.matched[3] && this.matched[4] === undefined) {
          this.isDisabled = false;
          console.log("Match!")
          this.score++;
          this.pokeArray.forEach(card => {
            if (card.id === this.matched[0]) {
              this.pokeArray.splice(this.pokeArray.indexOf(card), 1);
            }
          })
          this.pokeArray.forEach(card => {
            if (card.id === this.matched[0]) {
              this.pokeArray.splice(this.pokeArray.indexOf(card), 1);
            }
          })
          if (this.pokeArray.length <= 1) {
            console.log("Victory!");
            this.pokeArray = [];
          }
        } else {
          this.isDisabled = false;
          console.log("Failure");
          this.fails++;
          this.pokeArray.forEach(card => {
            if (card.flipped === false) {
              card.flipped = true;
            }
          })
        }
      }, 1000);
    }
  }
}
