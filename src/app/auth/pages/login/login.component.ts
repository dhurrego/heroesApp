import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    h1 {
      text-align: center;
    }
  `]
})
export class LoginComponent {

  constructor( private _router: Router,
                private _authService: AuthService ) { }

  login(){
    this._authService.login().subscribe(
      usuario => {
        if(usuario.id){
          this._router.navigate(['/heroes']);
        }
      }
    );
  }

}
