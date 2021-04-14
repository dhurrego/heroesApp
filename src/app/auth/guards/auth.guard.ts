import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private _authService: AuthService,
                private _router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this._authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if(!estaAutenticado){
                    this._router.navigate(['auth/login']);
                  }
                })
              );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this._authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if(!estaAutenticado){
                    this._router.navigate(['auth/login']);
                  }
                })
              );

  }
}
