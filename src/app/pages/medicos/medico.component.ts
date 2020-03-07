import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Hospital } from '../../models/hospital.model';

import { MedicoService, HospitalService } from '../../services/services.index';
import { Medico } from '../../models/medico.model';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');

  hospital: Hospital = new Hospital('');



  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUpload: ModalUploadService
  ) {

    activateRoute.params.subscribe( params =>{

      const id = params['id'];

      if ( id !== 'nuevo') {
        this.cargarMedico( id );
      }
    });
  }

  ngOnInit() {

    this._hospitalService.cargarHospitales()
          .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUpload.notificacion
          .subscribe( (resp: any) => {
            this.medico.img = resp.medico.img;

          });
  }

  cargarMedico( id: string) {

    this._medicoService.cargarMedico( id )
          .subscribe( (medico: any) => {
              console.log(medico);

              this.medico = medico;
              this.medico.hospital = medico.hospital._id;
              this.cambioHospital( this.medico.hospital );
          });
  }

  guardarMedico( f: NgForm ) {
    console.log(f.valid);
    console.log(f.value);

    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
          .subscribe( medico => {

              this.medico._id = medico._id;
              this.router.navigate(['/medicos']);
          });
  }

  cambioHospital( id: string ) {
    if (id) {
      this._hospitalService.obtenerHospital( id )
            .subscribe( (hospital: Hospital) => this.hospital = hospital);
    } else { return; }

  }
  cambiarFoto() {

    this._modalUpload.mostrarModal('medicos', this.medico._id );

  }

}
