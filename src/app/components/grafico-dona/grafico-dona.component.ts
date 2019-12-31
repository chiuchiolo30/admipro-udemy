import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html'
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  // los input son para recibir info de afuera
    @Input() ChartLabels: string[] = [];
    @Input() ChartData: number[] = [];
    @Input() ChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
