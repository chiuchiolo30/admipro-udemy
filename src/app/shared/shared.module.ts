/** Módulo independiente para los componentes que estan dentro de shared*/
import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';





@NgModule({
    declarations: [
       BreadcrumbsComponent,
       HeaderComponent,
       SidebarComponent,
       NopagefoundComponent
    ],
    exports: [
       BreadcrumbsComponent,
       HeaderComponent,
       SidebarComponent,
       NopagefoundComponent
    ]
})

export class SharedModuele { }


