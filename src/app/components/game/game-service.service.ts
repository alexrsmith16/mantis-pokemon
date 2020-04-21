import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private http: HttpClient) { }

  getPokemon() {
    return this.http.get("https://api.pokemontcg.io/v1/cards/");
  }
}
