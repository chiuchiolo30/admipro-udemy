import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// para iniciar sesión con Google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  // para iniciar sesión con Google
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }

  }

// para iniciar sesión con Google
  googleInit() {
    gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
            client_id: '114603806573-nif38nbr2sri4cg1hdbj5ovpv2kv3pv5.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile email'
        });

        this.attachSignin( document.getElementById('btnGoogle'));

    });
  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
          const profile = googleUser.getBasicProfile();
          const token = googleUser.getAuthResponse().id_token;

          this._usuarioService.loginGoogle( token )
                .subscribe( () => window.location.href = '#/dashboard' );

          // console.log(token);

    });

  }


  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(
          null,
          forma.value.email,
          forma.value.password
    );

    this._usuarioService.login( usuario, forma.value.recuerdame )
                .subscribe( correcto  => this.router.navigate(['/dashboard']));



  //  this.router.navigate([ '/dashboard' ]);

  }
}
