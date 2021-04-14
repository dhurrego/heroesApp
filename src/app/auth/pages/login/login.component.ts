import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( private _router: Router ) { }

  login(){
    // Ir al backend

    // Confirmar si el usuario existe

    this._router.navigate(['/heroes'])

  }

}
