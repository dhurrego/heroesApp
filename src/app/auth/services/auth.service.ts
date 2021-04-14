import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/auth.interface';
import { tap } from 'rxjs/operators';

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

  login(): Observable<Usuario>{
    return this._http.get<Usuario>(`${ this.baseUrl }/usuarios/1`)
                      .pipe(
                        tap( auth => this._auth = auth )
                      );
  }

}
