import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: ''
  };

  constructor( private _heroesService: HeroesService,
                private _route: ActivatedRoute,
                private _router: Router        
    ) { }

  ngOnInit(): void {

    if(this._router.url.includes('editar')){
      return;
    }
    
    this._route.params
      .pipe(
        switchMap( ({ id }) => this._heroesService.getHeroePorId( id ) )
      )
      .subscribe( 
        heroe => this.heroe = heroe,
        error => this._router.navigate(['/heroes/agregar'])
     );
    
  }

  guardar(){
    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }

    if( this.heroe.id ){
      this._heroesService.actualizarHeroe( this.heroe ).subscribe(
        resp => {
          console.log(`Actualizando`, resp);
        }
      );
    }else{
      this._heroesService.agregarHeroe( this.heroe ).subscribe(
        resp => {
          console.log(`Creando`, resp);
          this._router.navigate(['/heroes/editar', resp.id ]);
        }
      );
    }


  }

}
