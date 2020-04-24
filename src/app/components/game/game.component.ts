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
  public numOfPairs = 5
  public counter;
  public matched = [];
  public ctr;
  public temp;
  public index;
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
        // secondSet.forEach(element => {
        //   element.id = "2-" + element.id;
        // });

        this.pokeArray = randomSet.concat(secondSet);
        console.log(this.pokeArray);
        
        this.ctr = this.pokeArray.length;
        while (this.ctr > 0) {
          // console.log(this.ctr);
          this.index = Math.floor(Math.random() * this.ctr);
          // console.log(this.index);
          this.ctr--;
          // console.log(this.ctr);
          this.temp = this.pokeArray[this.ctr];
          // console.log(this.temp);
          this.pokeArray[this.ctr] =  this.pokeArray[this.index];
          // console.log(this.pokeArray);
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
  }

  isSelected() {
    this.counter = 0;
    this.matched = [];
    // thread.sleep(2000)
    this.pokeArray.forEach(card => {
      if (card.flipped === false) {
        this.counter += 1;
      }
    });
    if (this.counter === 2) {
      this.pokeArray.forEach(card => {
        if (card.flipped === false) {
          this.matched.push(card.id);
        }
      });
      setTimeout(() => {
        if (this.matched[0] === this.matched[1]) {
          console.log("Match!")
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
          console.log("Failure");
          this.pokeArray.forEach(card => {
            if (card.flipped === false) {
              card.flipped = true;
            }
          })
        }
      }, 1000);
    }
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
