import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';

/**rutas para todas las paginas que estan dentro de pages*/

const pagesRoutes: Routes = [
    { path: '',
      component: PagesComponent,
      canActivate: [ LoginGuardGuard ],
      children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
          { path: 'grafica1', component: Graficas1Component, data: { titulo: 'Grafica'} },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
          { path: 'accout-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema'} },
          { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },

          { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
                ]
    }
];

// el forChild se usa para rutas hijas
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
