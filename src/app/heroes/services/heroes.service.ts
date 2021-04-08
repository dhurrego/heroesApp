import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  url: string = 'http://localhost:3000/heroes';

  constructor( private _http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]>{
    return this._http.get<Heroe[]>(this.url);
  }

  getHeroePorId( id: string ): Observable<Heroe>{
    return this._http.get<Heroe>(`${this.url}/${id}`);
  }
}
