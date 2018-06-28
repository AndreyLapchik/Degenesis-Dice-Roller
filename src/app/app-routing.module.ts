import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnexionComponent } from './Composants/connexion/connexion.component';
import { AccueilComponent } from './Composants/accueil/accueil.component';
import { AuthGuard } from './AuthGuard';
import { InterventionComponent } from './Composants/intervention/intervention.component';
import { NoAuthGuard } from './NoAuthGuard';
import { ChantierComponent } from './Composants/chantier/chantier.component';
import { InformationComponent } from './Composants/information/information.component';


const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent, canActivate: [NoAuthGuard] }, // , 
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard],
    children: [
      { path: 'chantier', component: ChantierComponent },
      { path: 'intervention', component: InterventionComponent },
      { path: 'information', component: InformationComponent },
      { path: '', redirectTo: '/accueil/chantier', pathMatch: 'full' }
    ]  
  },
  { path: '', redirectTo: '/accueil/chantier', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
