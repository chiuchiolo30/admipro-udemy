import { RouterModule, Routes } from '@angular/router';

/** Principales */

import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

/** Guard */
import { LoginGuardGuard, AdminGuard } from '../services/services.index';

/** Mantenimiento */
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

/**rutas para todas las paginas que estan dentro de pages*/

const pagesRoutes: Routes = [
    { path: '',
      component: PagesComponent,
      canActivate: [ LoginGuardGuard ],
      children: [
        //   Principales
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
          { path: 'grafica1', component: Graficas1Component, data: { titulo: 'Grafica'} },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
          { path: 'accout-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema'} },
          { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
          { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },

        //   Mantenimientos
          { path: 'usuarios',
            component: UsuariosComponent,
            canActivate: [ AdminGuard ],
            data: { titulo: 'Mantenimiento de Usuarios'}
          },
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales'} },
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos'} },
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico'} },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
                ]
    }
];

// el forChild se usa para rutas hijas
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
