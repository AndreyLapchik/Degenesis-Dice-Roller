import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './Composants/accueil/accueil.component';
import { AuthGuard } from './Classes/AuthGuard';
import { NoAuthGuard } from './Classes/NoAuthGuard';

const routes: Routes = [
  { path: '', redirectTo: '/accueil/chantier', pathMatch: 'full' },
  { path: 'connexion', loadChildren: './Composants/connexion/connexion.module#ConnexionModule' , canActivate: [NoAuthGuard] }, // ,
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'chantier',
        loadChildren: './Composants/chantier/chantier.module#ChantierModule'
      },
      {
        path: 'intervention',
        loadChildren: './Composants/intervention/intervention.module#InterventionModule'
      },
      {
        path: 'information',
        loadChildren: './Composants/information/information.module#InformationModule'
      },
      {
        path: '',
        redirectTo: '/accueil/chantier',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
