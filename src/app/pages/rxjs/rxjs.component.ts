import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {




    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log('Subs', numero), // 1er CallBack: cuando recibo un dato
      error => console.log('Error en el obs', error ), // 2da CallBack: cuando ocurre un error
      () => console.log('El observador termino') // 3er CallBack: cuando el Observador termina, no recibe ningun parametro 
     );


  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();

  }


  regresaObservable(): Observable<any> {
    return new Observable( observer => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // detiene el intervalo en 3
        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   // detiene el observable, deja de escuchar.
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('Auxilio!');
        // }

      }, 1000);

    }).pipe(

      map( (resp: any) => resp.valor),
      filter( ( valor, index) => {

        if ( (valor % 2) === 1 ) {
          // impar
          return true;

        } else {
          // par
          return false;
        }

      })

    );
  }

}
