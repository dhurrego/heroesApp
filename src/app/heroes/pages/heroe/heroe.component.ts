import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( 
    private _heroesService: HeroesService ,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroe();
  }

  getHeroe(){
    this._route.params
      .pipe(
        switchMap( ({ id }) => this._heroesService.getHeroePorId(id) )
      )
      .subscribe(
        heroe => {
          this.heroe = heroe;
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/heroes/listado']);
        }
      );
  }

}
