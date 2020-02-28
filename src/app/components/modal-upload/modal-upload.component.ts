import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/services.index';
import { ModalUploadService } from './modal-upload.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp  = null;

    this._modalUploadService.ocultarModal();
  }


  // ============================================================================
  // método para seleccionar imagen y validar que sea una imagen
  // ============================================================================
  seleccionImage( archivo: File ) {
    // console.log(event);

    // Sí no selecciono ningun archivo, no devuelve nada.
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    // validar que el archivo sea una imagen.
    if ( archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Sólo imagenes',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    // JavaScript
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {

    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
          .then( resp => {

            this._modalUploadService.notificacion.emit( resp );
            this.cerrarModal();

          })
          .catch( err => {
              console.log('Error en la carga...');

          });
  }
}
