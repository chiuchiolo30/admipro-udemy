import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioServices: UsuarioService
  ) { }

  canActivate(): Promise<boolean>| boolean  {


    const token = this._usuarioServices.token;
    const payload = JSON.parse( atob( token.split('.')[1] ));

    const expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this._usuarioServices.logout();
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva( fechaExp: number): Promise<boolean> {

    return new Promise( (resolve, reject) => {
        const tokenExp = new Date( fechaExp * 1000 );
        const ahora = new Date();

        ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000 ));

        if ( tokenExp.getTime() > ahora.getTime() ) {
          console.log(tokenExp);
          console.log(ahora);
          resolve( true );
        } else {
          this._usuarioServices.renuevaToken()
            .subscribe( () => {
              resolve(true);
            }, () => {
              reject(false);
              this._usuarioServices.logout();
            });
        }

        resolve( true );

    });
  }

  expirado( fechaExp: number ) {

    const ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }

    // return ( fechaExp < ahora ) ? true : false;

  }

}
