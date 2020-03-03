import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalRegistro: number = 0;
          desde: number = 0;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
      this._medicoService.cargarMedicos(this.desde)
            .subscribe( (medicos: any) => {
               this.medicos = medicos;
               this.totalRegistro = this._medicoService.totalMedicos;
            });
  }

  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos( termino )
          .subscribe( medicos => this.medicos = medicos );

  }

  borrarMedico( medico: Medico ) {

    console.log(medico);

    if ( this.medicos.length > 1 ) {

      Swal.fire({
          title: 'Esta seguro?',
          text: 'Esta a punto de borrar a ' + medico.nombre,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si!'
      })
      .then((result) => {

          if (result.value) {
            this._medicoService.borrarMedico(medico._id)
                  .subscribe( borrado => {
                    console.log(borrado);
                    this.cargarMedicos();
                  });
          }
      });
    } else {

        Swal.fire({
          title: 'No puede borrar el médico',
          text: `${ medico.nombre } es el único médico del hospital!`,
          icon: 'error'
        });
        return;
    }


  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalRegistro ) {
      return;
    }
    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();

  }


}
