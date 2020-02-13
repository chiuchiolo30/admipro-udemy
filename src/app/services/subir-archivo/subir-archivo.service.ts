import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }
// ============================================================================
// Método para subir archivo de cualquier tipo
// ============================================================================
  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( ( resolve, reject ) => {

      const formData = new FormData();

      // inicializar petición AJAX
      const xhr = new XMLHttpRequest();

      // configuración del formData
      formData.append( 'imagen', archivo, archivo.name );

      // configuración de la petición AJAX
      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {
          if (xhr.status === 200 ) {
            console.log('imagen subida');
            resolve( JSON.parse( xhr.response ));
          } else {
            console.log('Fallo la subida');
            reject( xhr.response );
          }
        }
      };
      // fin de la configuración AJAX

      const url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;

      xhr.open('PUT', url, true );
      xhr.send( formData );
    });

  }
}
