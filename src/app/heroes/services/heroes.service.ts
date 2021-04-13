import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Heroe } from '../interfaces/heroes.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;
  private production: string = (environment.production) ? '.json' : '';
  

  constructor( private _http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]>{
    return this._http.get<Heroe[]>(`${ this.baseUrl }/heroes${ this.production }`);
  }

  getHeroePorId( id: string ): Observable<Heroe>{
    return this._http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  getSugerencias( termino: string ): Observable<Heroe[]>{
    return this._http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ termino }&_limit=6`);
  }

  agregarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this._http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe);
  }

  actualizarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this._http.put<Heroe>(`${ this.baseUrl }/heroes/${ heroe.id }`, heroe);
  }

}
