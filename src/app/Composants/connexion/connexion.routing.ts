import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnexionComponent } from './connexion.component';

const routes: Routes = [
  { path: "", component: ConnexionComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ConnexionRoutes { }
