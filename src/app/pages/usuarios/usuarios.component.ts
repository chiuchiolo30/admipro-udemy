import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]    = [];
  desde: number          = 0;
  totalRegistro: number  = 0;
  cargando: boolean      = true;

  constructor(
    public _usuariosServices: UsuarioService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
      this._modalUploadService.mostrarModal( 'usuarios', id);
  }

  cargarUsuarios() {

      this.cargando = true;

      this._usuariosServices.cargarUsuarios( this.desde )
            .subscribe( (resp: any) => {
              // console.log(resp);
              this.totalRegistro = resp.total;
              this.usuarios = resp.usuarios;
              this.cargando = false;

            });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;
    // console.log(desde);

    if ( desde >= this.totalRegistro ) {
      return;
    }
    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

      if ( termino.length <= 0 ) {
        this.cargarUsuarios();
        return;
      }
      this.cargando = true;
      this._usuariosServices.buscarUsuarios( termino )
                .subscribe( (usuarios: Usuario[]) => {
                    this.usuarios = usuarios;
                    this.cargando = false;

                });
  }

  borrarUsuario( usuario: Usuario) {
      console.log(usuario);

      if ( usuario._id === this._usuariosServices.usuario._id ) {

        Swal.fire({
          title: 'No puede borrar usuario',
          text: 'No se puede borrar a si mismo',
          icon: 'error'
        });
        return;
      }

      Swal.fire({
          title: 'Esta seguro?',
          text: 'Esta a punto de borrar a ' + usuario.nombre,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si!'
      })
      .then((result) => {

          if (result.value) {
            this._usuariosServices.borrarUsuario(usuario._id)
                  .subscribe( borrado => {
                    console.log(borrado);
                    this.cargarUsuarios();
                  });
          }
      });


  }

  guardarUsuario( usuario: Usuario) {

      this._usuariosServices.actualizarUsuario( usuario )
            .subscribe();

  }

}
