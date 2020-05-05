import { Component, OnInit } from "@angular/core";
import { GameServiceService } from "./game-service.service";
import { Card } from "../../models/card";
import * as _ from "lodash";

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
  public ranNum = Math.floor(Math.random() * 89);
  public numOfPairs = 10;
  public numOfPlayers;
  public playerArray = {
    player1: 'example1',
    player2: 'example2',
    player3: 'example3',
    player4: 'example4'
  }
  public counter;
  public check = 0;
  public matched = [];
  public ctr;
  public temp;
  public index;
  public isDisabled: boolean = false;
  public tempUsersArray = [];
  public usersArray = [
    { name: "Test-1", score: 0 },
    { name: "Test-2", score: 0 },
    { name: "Test-3", score: 0 },
    { name: "Test-4", score: 0 },
  ];
  public turn = 0;
  public round = 0;
  public remaining;
  public currentPlayer = this.usersArray[0].name;
  public victor = [];
  public losers = [];
  public difficulty = "medium";
  public roundsRemaining;
  public resetRounds;

  constructor(private _gameService: GameServiceService) {}

  ngOnInit(): void {
    this.getPokemon();
    let setup = this._gameService.setupGet();
    this.numOfPairs = Number(setup.numOfCards);
    this.numOfPlayers = setup.playerNames;
    this.remaining = setup.numOfCards;
    this.difficulty = setup.difficulty;
    setup.playerNames.forEach((element) => {
      if (element.name !== "") {
        this.tempUsersArray.push(element);
      }
    });
    this.usersArray = this.tempUsersArray;
    this.currentPlayer = this.usersArray[0].name;
    if (this.usersArray.length <= 1) {
      this.singlePlayer();
    }
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

        this.ctr = this.pokeArray.length;
        while (this.ctr > 0) {
          this.index = Math.floor(Math.random() * this.ctr);
          this.ctr--;
          this.temp = this.pokeArray[this.ctr];
          this.pokeArray[this.ctr] = this.pokeArray[this.index];
          this.pokeArray[this.index] = this.temp;
        }

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
    this.round = 0;
    this.victor = [];
    this.losers = [];
    this.roundsRemaining = this.resetRounds;
  }

  singlePlayer() {
    if (this.difficulty === "easy") {
      this.roundsRemaining = this.numOfPairs * 3;
      this.resetRounds = this.numOfPairs * 3;
    } else if (this.difficulty === "medium") {
      this.roundsRemaining = this.numOfPairs * 2;
      this.resetRounds = this.numOfPairs * 2;
    } else if (this.difficulty === "hard") {
      this.roundsRemaining = Math.floor(this.numOfPairs * 1.5);
      this.resetRounds = Math.floor(this.numOfPairs * 1.5);
    }
  }

  isSelected(card) {
    if (!card.flipped) {
      return;
    }
    if (this.isDisabled) {
      return;
    }
    card.flipped = !card.flipped;
    this.counter = 0;
    this.matched = [];
    this.pokeArray.forEach((card) => {
      if (card.flipped === false) {
        this.counter += 1;
      }
    });
    if (this.counter >= 2) {
      this.isDisabled = true;
      this.roundsRemaining--;
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
      setTimeout(() => {
        if (
          this.matched[0] === this.matched[3] &&
          this.matched[4] === undefined
        ) {
          console.log("Match!");
          this.remaining--;
          this.usersArray[this.turn].score++;
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
            console.log("victor: " + this.victor + ", loser: " + this.losers);
          }
        } else if (this.roundsRemaining === 0) {
          console.log("You Lose!")
          this.pokeArray = [];
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
            this.round++;
          }
          this.currentPlayer = this.usersArray[this.turn].name;
        }
        this.isDisabled = false;
      }, 1000);
    }
  }
}