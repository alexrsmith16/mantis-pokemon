import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { GameServiceService } from "./game-service.service";
import { Card } from "../../models/card";
import * as _ from "lodash";
import { UserService } from "../../user.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  public pokeArray;
  public pokemon;
  public imgUrl =
    "https://jbrogan17.files.wordpress.com/2010/12/jared-pokemon-card-backside1.jpg";
  public ranNum = Math.floor(Math.random() * 90);
  public numOfPairs = 2;
  public counter;
  public check = 0;
  public matched = [];
  public ctr;
  public temp;
  public index;
  public isDisabled: boolean = false;
  public usersArray = [
    { name: "abc", score: 0 },
    { name: "xyz", score: 0 },
    { name: "def", score: 0 },
    { name: "qwerty", score: 0 },
  ];
  public turn = 0;
  public currentPlayer = this.usersArray[0].name;
  public victor = [];
  public losers = [];

  constructor(private _gameService: GameServiceService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this._gameService.getPokemon().subscribe(
      (data: { cards: Card[] }) => {
        this.pokemon = data && data.cards ? data.cards : [];

        let randomSet = this.pokemon.slice(
          this.ranNum,
          this.ranNum + this.numOfPairs
        );
        let secondSet = _.cloneDeep(randomSet);

        this.pokeArray = randomSet.concat(secondSet);
        // console.log(this.pokeArray);

        this.ctr = this.pokeArray.length;
        while (this.ctr > 0) {
          this.index = Math.floor(Math.random() * this.ctr);
          this.ctr--;
          this.temp = this.pokeArray[this.ctr];
          this.pokeArray[this.ctr] = this.pokeArray[this.index];
          this.pokeArray[this.index] = this.temp;
        }

        // console.log(this.pokeArray);

        this.pokeArray.forEach((element) => {
          element.flipped = true;
        });
      },
      (err) => console.error(err),
      () => console.log("Done getting data.")
    );
  }

  resetGame() {
    this.getPokemon();
    this.usersArray.forEach((element) => {
      element.score = 0;
    });
    this.turn = 0;
    this.victor = [];
    this.losers = [];
  }

  isSelected(card) {
    if (!card.flipped) {
      return;
    }
    if (this.isDisabled) {
      return;
    }
    // console.log(this.currentPlayer);
    card.flipped = !card.flipped;
    this.counter = 0;
    this.matched = [];
    this.pokeArray.forEach((card) => {
      if (card.flipped === false) {
        this.counter += 1;
      }
    });
    // console.log(this.counter);
    if (this.counter >= 2) {
      this.isDisabled = true;
      this.pokeArray.forEach((card) => {
        if (card.flipped === false) {
          this.matched.push(card.id);
        }
      });
      this.pokeArray.forEach((card) => {
        if (card.flipped === false) {
          this.matched.push(card.id);
        }
      });
      // console.log(this.matched[0], this.matched[3], this.matched);
      setTimeout(() => {
        if (
          this.matched[0] === this.matched[3] &&
          this.matched[4] === undefined
        ) {
          console.log("Match!");
          this.usersArray[this.turn].score++;
          // console.log(this.usersArray[this.turn]);
          this.pokeArray.forEach((card) => {
            if (card.id === this.matched[0]) {
              this.pokeArray.splice(this.pokeArray.indexOf(card), 1);
            }
          });
          this.pokeArray.forEach((card) => {
            if (card.id === this.matched[0]) {
              this.pokeArray.splice(this.pokeArray.indexOf(card), 1);
            }
          });
          if (this.pokeArray.length <= 1) {
            console.log("Victory!");
            let victorChoice = 0;
            this.usersArray.forEach((element) => {
              if (element.score > victorChoice) {
                victorChoice = element.score
              }
            });
            this.usersArray.forEach((element) => {
              if (element.score === victorChoice) {
                this.victor.push(element.name);
              } else {
                this.losers.push(element.name);
              }
            });
          }
        } else {
          console.log("Failure");
          this.pokeArray.forEach((card) => {
            if (card.flipped === false) {
              card.flipped = true;
            }
          });
          this.turn++;
          if (this.turn >= this.usersArray.length) {
            this.turn = 0;
          }
          this.currentPlayer = this.usersArray[this.turn].name;
        }
        this.isDisabled = false;
        // console.log(this.turn, this.currentPlayer);
      }, 1000);
    }
  }
}
