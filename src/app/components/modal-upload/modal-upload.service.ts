import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';


  public notificacion: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Modal upload listo');
  }

  ocultarModal() {

    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal( tipo: string, id: string) {

    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
