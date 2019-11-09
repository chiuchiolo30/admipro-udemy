/** Módulo independiente para los componentes que estan dentro de pages*/

import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModuele } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
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
        FormsModule

    ]
})

export class PagesModule {  }
