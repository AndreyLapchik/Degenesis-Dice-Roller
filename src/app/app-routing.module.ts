import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
