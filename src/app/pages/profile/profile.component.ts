import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor( public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.usuario;

  }

  ngOnInit() {

  }
// ============================================================================
// Método para que llama el servicio actualizar usuario
// ============================================================================
  guardar( usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {

      this.usuario.email  = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
                    .subscribe();
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
// ============================================================================
// Método para cambiar imagen
// ============================================================================
  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }
}
