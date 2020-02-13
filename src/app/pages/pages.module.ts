/** Módulo independiente para los componentes que estan dentro de pages*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModuele } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// módulos
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModuele,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        PipesModule


    ]
})

export class PagesModule {  }
