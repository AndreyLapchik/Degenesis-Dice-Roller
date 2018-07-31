import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: "", component: ConnexionComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ConnexionRoutes {}
