import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

/**rutas para todas las paginas que estan dentro de pages*/

const pagesRoutes: Routes = [
    { path: '',
      component: PagesComponent,
      children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'grafica1', component: Graficas1Component },
          { path: 'accout-settings', component: AccoutSettingsComponent },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
                ]
    }
];

// el forChild se usa para rutas hijas
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
