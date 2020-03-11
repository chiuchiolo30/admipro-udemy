import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { URL_SERVICIOS } from '../../config/config';
// Models
import { Usuario } from '../../models/usuario.model';

// Services
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

// SweetAlert2
import Swal from 'sweetalert2';

// RxJs
  import { map, catchError } from 'rxjs/operators';
  import { throwError } from 'rxjs/internal/observable/throwError';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
    ) {
      this.cargarStorage();
      // console.log('Servicio de usuario listo!');

      }

// ============================================================================
// Método para renovar el token
// ============================================================================
renuevaToken() {
  const url = `${ URL_SERVICIOS }/login/renuevatoken?token=${this.token}`;
    return this.http.get( url )
      .pipe(map( (resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token );
          console.log('token renovado');

          return true;
      }),
      catchError( err => {
        this.logout();
        Swal.fire({
          title: 'No se pudo renovar token',
          text: 'No fue posible renovar token',
          icon: 'error'
        });
        console.log('ERROR!', err);
        return throwError( err );
      })
      );
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
        this.menu  = JSON.parse( localStorage.getItem('menu') );
      } else {
        this.token    = '';
        this.usuario  = null;
        this.menu  = [];
      }
    }
   // ============================================================================
   // Centralizado del guardado en el localstorage
   // ============================================================================
   guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {

        localStorage.setItem('id', id );
        localStorage.setItem('token', token );
        localStorage.setItem('usuario', JSON.stringify(usuario) );
        localStorage.setItem('menu', JSON.stringify(menu) );

        this.usuario  = usuario;
        this.token    = token;
        this.menu     = menu;
   }
   // ============================================================================
   // Método logout
   // ============================================================================
  logout() {
    this.usuario  = null;
    this.token    = '';
    this.menu  = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }
   // ============================================================================
   // método que llama al servicio 'login google' del BackEnd
   // ============================================================================
   loginGoogle( token: string ) {
    const url = `${ URL_SERVICIOS }/login/google`;

    return this.http.post( url, { token })
                .pipe(map( (resp: any) => {
                      console.log(resp);
                      this.guardarStorage( resp.id, resp.token, resp.Usuario, resp.menu);
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

    const url = `${URL_SERVICIOS}/login`;
    return this.http.post( url, usuario)
            .pipe(map( (resp: any) => {
                 // grabar en el localstorage
                 console.log(resp);
                 this.guardarStorage( resp.id, resp.token, resp.Usuario, resp.menu);
                 return true;
                  }),
                  catchError( (err: any) => {
                    Swal.fire({
                      title: 'Error en el login',
                      text: err.error.mensaje,
                      icon: 'error'
                    });
                    console.log('ERROR!', err);
                    return throwError( err );
                  })
            );

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
                   }),
                       catchError( (err: any) => {
                        Swal.fire({
                          title: err.error.mensaje,
                          text: err.error.errors.message,
                          icon: 'error'
                        });
                        return throwError( err );
                      })
                  );
   }
  // ============================================================================
  // método que llama al servicio 'actualizar usuario' del backend
  // ============================================================================
   actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;

    url += '?token=' + this.token;


    return this.http.put( url, usuario )
            .pipe(map( (resp: any) => {

                  if ( usuario._id === this.usuario._id ) {
                    const usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu);
                  }
                  Swal.fire({
                    title: 'Usuario actualizado',
                    text: usuario.nombre,
                    icon: 'success'
                  });
                  return true;
            }),
                  catchError( (err: any) => {
                    Swal.fire({
                      title: err.error.mensaje,
                      text: err.error.errors.message,
                      icon: 'error'
                    });
                    return throwError( err );
            })
            );

   }

// ============================================================================
// Método para cambiar imagen
// ============================================================================
  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {

            const usuarioDB: Usuario = resp.usuario;
            this.usuario.img = resp.usuario.img;

            this.guardarStorage( id, this.token, usuarioDB, this.menu );

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

// ============================================================================
// Método para cargar los usuarios de la DB, llamando el servicio del backend
// ============================================================================
  cargarUsuarios( desde: number = 0) {

    const url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
    return this.http.get( url );
  }

// ============================================================================
// Método para buscar usuarios, llamando el servicio del backend
// ============================================================================

  buscarUsuarios( termino: string) {

    const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${ termino }`;
    return this.http.get( url )
                .pipe( map( (resp: any) => resp.usuarios));

  }
// ============================================================================
// Método para borrar un usuario, llamando el servicio del backend
// ============================================================================
  borrarUsuario( id: string ) {
    let url = `${URL_SERVICIOS}/usuario/${id}`;
    url += `?token=${this.token}`;
    return this.http.delete(url)
                .pipe( map( resp => {
                    Swal.fire(
                      'Usuario borrado!',
                      'El usuario fue eliminado correctamente',
                      'success'
                        );
                    return true;
                }));
  }
}
