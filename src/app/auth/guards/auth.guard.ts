import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private _authService: AuthService ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('route', route);
    console.log('state', state);

    if(this._authService.auth.id){
      return true;
    }else{
      console.log('Bloqueado por AuthGuard - CanActivate')
      return false;
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if(this._authService.auth.id){
        return true;
      }else{
        console.log('Bloqueado por AuthGuard - CanLoad')
        return false;
      }
  }
}
