import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/internal/operators/map';

import { UsuarioService } from '../usuario/usuario.service';

import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


// ============================================================================
// Método para cargar los médicos de la DB, llamando el servicio del backend
// ============================================================================
  cargarMedicos( desde: number = 0 ) {
    const url = `${URL_SERVICIOS}/medico?desde=${desde}`;
    return this.http.get( url )
                .pipe( map( (resp: any) => {
                  this.totalMedicos = resp.total;
                  return resp.medicos;
                }));
  }

// ============================================================================
// Método para cargar un médicos de la DB, llamando el servicio del backend
// ============================================================================
  cargarMedico( id: string ) {

    const url = `${URL_SERVICIOS}/medico/${ id }`;

    return this.http.get( url )
                .pipe( map( (resp: any) => resp.medico ));
  }
// ============================================================================
// Método para buscar médicos, llamando el servicio del backend
// ============================================================================

  buscarMedicos( termino: string) {

  const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${ termino }`;
  return this.http.get( url )
              .pipe( map( (resp: any) => resp.medicos));

  }

// ============================================================================
// Método para borrar un médico, llamando el servicio del backend
// ============================================================================

  borrarMedico( id: string ) {

    const token   = this._usuarioService.token;
    const url     = `${URL_SERVICIOS}/medico/${ id }?token=${ token }`;

    return this.http.delete(url)
                      .pipe( map( resp => {
                          Swal.fire(
                            'Médico borrado!',
                            'El médico fue eliminado correctamente',
                            'success'
                              );
                          return true;
                      }));

  }
// ============================================================================
// Método para crear un médico, llamando el servicio del backend
// ============================================================================  

  guardarMedico( medico: Medico ) {

    const token   = this._usuarioService.token;

    if ( medico._id ) {
      // Actualizando
      const url = `${URL_SERVICIOS}/medico/${ medico._id }?token=${ token }`;
      return this.http.put( url, medico )
                  .pipe(map( (resp: any) => {
                    Swal.fire(
                      'Médico actualizado!',
                       medico.nombre,
                      'success'
                        );
                    return resp.medico;
                  }));

    } else {
      // Creando
      const url = `${URL_SERVICIOS}/medico?token=${ token }`;
      return this.http.post( url, medico )
              .pipe(map( (resp: any ) => {
                Swal.fire(
                  'Médico creado!',
                   medico.nombre,
                  'success'
                    );
                return resp.medico;
              }));
    }

  }
}
