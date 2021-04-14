import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  get auth(): Usuario {
    return this._authService.auth;
  }

  constructor( private _router: Router,
                private _authService: AuthService ) { }

  ngOnInit(): void {
    
  }

  logout(){
    // Ir al backend

    // Confirmar si el usuario existe

    this._router.navigate(['/auth'])

  }

}
