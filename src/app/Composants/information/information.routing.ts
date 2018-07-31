import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information.component';

const routes: Routes = [
  { path: "", component: InformationComponent },
];

export const InformationRoutes = RouterModule.forChild(routes);
