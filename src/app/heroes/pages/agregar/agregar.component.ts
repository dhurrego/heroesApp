import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
                private _router: Router,
                private _snackBar: MatSnackBar,
                public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    if(!this._router.url.includes('editar')){
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

    if(  !this.heroe.id && !this.heroe.alt_img ) {
      this.mostrarSnackbar('Se debe ingresar la URL de la imagén');
      return;
    }

    if( this.heroe.id ){
      this._heroesService.actualizarHeroe( this.heroe ).subscribe(resp => this.mostrarSnackbar('Registro Actualizado'));
    }else{
      this._heroesService.agregarHeroe( this.heroe ).subscribe(
        resp => {
          this.mostrarSnackbar('Registro creado');
          this._router.navigate(['/heroes/editar', resp.id ]);
        }
      );
    }
  }

  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    });

    dialog.afterClosed().subscribe(
      result => {
        if(result){
          this._heroesService.borrarHeroe( this.heroe.id! ).subscribe(
            resp => {
              this.mostrarSnackbar('Registro borrado');
              this._router.navigate(['/heroes']);
            }
          );
        }
      }
    );
  }

  mostrarSnackbar( mensaje: string ){
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }

}
