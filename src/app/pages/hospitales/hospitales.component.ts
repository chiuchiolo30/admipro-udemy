import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';

import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/services.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})

export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];


  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarHospitales();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
            .subscribe( hospitales => this.hospitales = hospitales );
  }

  buscarHospital( termino: string ) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
          .subscribe( hospitales => this.hospitales = hospitales );
  }

  // borrarHospital( hospital: Hospital ) {
  //     this._hospitalService.borrarHospital( hospital._id )
  //           .subscribe( () => this.cargarHospitales());
  // }
  borrarHospital( hospital: Hospital) {
    console.log(hospital);

    if ( this.hospitales.length === 1 ) {

      Swal.fire({
        title: `No puede borrar el hospital: ${hospital.nombre}`,
        text: 'Es el único hospital que hay, no se puede quedar sin hospital!',
        icon: 'error'
      });
      return;
    }

    Swal.fire({
        title: 'Esta seguro?',
        text: `Esta a punto de borrar el ${hospital.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    })
    .then((result) => {

        if (result.value) {
          this._hospitalService.borrarHospital(hospital._id)
                .subscribe( borrado => {
                  console.log(borrado);
                  this.cargarHospitales();
                });
        }
    });


}

  guardarHospital( hospital: Hospital ) {
        this._hospitalService.actualizarHospital( hospital )
              .subscribe();
  }

   crearHospital() {

    Swal.fire({
          title: 'Crear Hospital',
          text: 'Ingrese el nombre del Hospital',
          input: 'text',
          inputAttributes: {
            autoCapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Swal.isLoading()
      }).then( (valor: any) => {

            if ( !valor.value || valor.value.length === 0) { return; }
            this._hospitalService.crearHospital( valor.value )
                .subscribe( () => this.cargarHospitales() );
        });
  }

  actualizarImagen( hospital: Hospital ) {
      this._modalUploadService.mostrarModal( 'hospitales', hospital._id);
  }



}
