import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
    ) {
      this.cargarStorage();
      console.log('Servicio de usuario listo!');

      }

  // ============================================================================
  // Método para verificar si está logeado
  // ============================================================================
  estaLogueado() {
    return ( this.token.length > 0 ) ? true : false;
  }

    // ============================================================================
    // Método para cargar el storage
    // ============================================================================
    cargarStorage() {
      if ( localStorage.getItem('token') ) {
        this.token    = localStorage.getItem( 'token' );
        this.usuario  = JSON.parse( localStorage.getItem('usuario') );
      } else {
        this.token    = '';
        this.usuario  = null;
      }
    }
   // ============================================================================
   // Centralizado del guardado en el localstorage
   // ============================================================================
   guardarStorage( id: string, token: string, usuario: Usuario) {

        localStorage.setItem('id', id );
        localStorage.setItem('token', token );
        localStorage.setItem('usuario', JSON.stringify(usuario) );

        this.usuario  = usuario;
        this.token    = token;
   }
   // ============================================================================
   // Método logout
   // ============================================================================
  logout() {
    this.usuario  = null;
    this.token    = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }
   // ============================================================================
   // método que llama al servicio 'login google' del BackEnd
   // ============================================================================
   loginGoogle( token: string ) {
    const url = `${ URL_SERVICIOS }/login/google`;

    return this.http.post( url, { token })
                .pipe(map( (resp: any) => {
                      this.guardarStorage( resp.id, resp.token, resp.Usuario);
                      return true;
                }));
   }

   // ============================================================================
   // método que llama al servicio 'login' del BackEnd
   // ============================================================================
   login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
        localStorage.setItem( 'email', usuario.email );
    } else {
        localStorage.removeItem( 'email' );
    }

    const url = `${ URL_SERVICIOS }/login`;
    return this.http.post( url, usuario )
            .pipe(map( (resp: any) => {

   // grabar en el localstorage
                 this.guardarStorage( resp.id, resp.token, resp.Usuario);
              // localStorage.setItem('id', resp.id );
              // localStorage.setItem('token', resp.token );
              // localStorage.setItem('usuario', JSON.stringify(resp.Usuario) );

              return true;
            }));
   }



  // ============================================================================
  // método que llama al servicio 'crear usuario' del backend
  // ============================================================================
   crearUsuario( usuario: Usuario) {

     const url = `${ URL_SERVICIOS }/usuario`;
// regreso un observador para poder subscribirme
     return this.http.post( url, usuario )
                   .pipe(map( (resp: any) => {
                       Swal.fire({
                         title: 'Usuario creado',
                         text: usuario.email,
                         icon: 'success'
                       });
                        return resp.usuario;
                   }));

   }
  // ============================================================================
  // método que llama al servicio 'actualizar usuario' del backend
  // ============================================================================
   actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;

    url += '?token=' + this.token;


    return this.http.put( url, usuario )
            .pipe(map( (resp: any) => {
                  const usuarioDB: Usuario = resp.usuario;

                  this.guardarStorage( usuarioDB._id, this.token, usuarioDB);
                  Swal.fire({
                    title: 'Usuario actualizado',
                    text: usuario.nombre,
                    icon: 'success'
                  });
                  return true;
            }));

   }

// ============================================================================
// Método para cambiar imagen
// ============================================================================
  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {

            const usuarioDB: Usuario = resp.usuario;
            this.usuario.img = resp.usuario.img;

            this.guardarStorage( id, this.token, usuarioDB);

            Swal.fire({
              title: 'Imagen actualizada',
              text: this.usuario.nombre,
              icon: 'success'
            });

        })
        .catch( resp => {
            console.log(resp);
        });
  }

}
