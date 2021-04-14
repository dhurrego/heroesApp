import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Usuario } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Usuario | undefined;

  get auth() {
    return { ...this._auth! };
  }

  constructor( private _http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }else{

      return this._http.get<Usuario>(`${ this.baseUrl }/usuarios/${ localStorage.getItem('token')}`)
              .pipe(
                map( auth => {
                  this._auth = auth;
                  return true;
                })
              );
}
  }

  login(): Observable<Usuario>{
    return this._http.get<Usuario>(`${ this.baseUrl }/usuarios/1`)
            .pipe(
              tap( auth => this._auth = auth ),
              tap( auth => localStorage.setItem('token', auth.id ))
            );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }

}
