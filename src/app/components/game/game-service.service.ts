import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Setup } from 'src/app/models/setup';
// import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  public scope: Setup;

  constructor(private http: HttpClient) { }

  getPokemon() {
    return this.http.get("https://api.pokemontcg.io/v1/cards/");
  }

  public setupGet(): Setup {
    return this.scope;
  }

  public setupSet(scope: any): void {
      this.scope = scope;
  }
}
