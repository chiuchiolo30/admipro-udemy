/** Módulo independiente para los componentes que estan dentro de shared*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';





@NgModule({
   imports: [
      RouterModule,
      CommonModule,
      PipesModule
   ],
    declarations: [
       BreadcrumbsComponent,
       HeaderComponent,
       SidebarComponent,
       NopagefoundComponent,
       ModalUploadComponent
    ],
    exports: [
       BreadcrumbsComponent,
       HeaderComponent,
       SidebarComponent,
       NopagefoundComponent,
       ModalUploadComponent
    ]
})

export class SharedModuele { }


