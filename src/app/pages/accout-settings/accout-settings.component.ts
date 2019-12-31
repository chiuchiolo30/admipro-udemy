import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingService } from '../../services/services.index';



@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document,
                public _ajustes: SettingService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {

    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( link: any) {

    const selectores: any = document.getElementsByClassName('selector');
    // elimino todas las clases working
    for ( const ref of selectores ) {
      // para remover una clase
        ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;
    for ( const ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }
// de esta forma se puede renderizar atributos HTML que angular desconoce.
}
