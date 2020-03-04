// Servicios de angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Configuración URL
import { URL_SERVICIOS } from '../../config/config';

// Modelos - Clases
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];


  constructor(
    public activateRoute: ActivatedRoute,
    public http: HttpClient
  ) {

    activateRoute.params
      .subscribe( params => {
          const termino = params.termino;
          if ( termino.length <= 0 ) { return; }
          this.buscar( termino );
          console.log(termino);


      });
  }

  ngOnInit() {
  }

  buscar( termino: string ) {

      const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
      this.http.get( url )
            .subscribe( (resp: any) => {
              console.log(resp);
              this.hospitales = resp.hospitales;
              this.usuarios   = resp.usuarios;
              this.medicos    = resp.medicos;
            });
  }

}
