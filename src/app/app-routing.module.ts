import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { ConnexionComponent } from './Composants/connexion/connexion.component';
import { AccueilComponent } from './Composants/accueil/accueil.component';
import { AuthGuard } from './AuthGuard';
// import { InterventionComponent } from './Composants/intervention/intervention.component';
import { NoAuthGuard } from './NoAuthGuard';
<<<<<<< HEAD
// import { InformationComponent } from './Composants/information/information.component';
=======
>>>>>>> 8d26c45... Removed Pre-Caching, Moved Dialogues in Components


const routes: Routes = [
  { path: 'connexion', loadChildren: './Composants/connexion/connexion.module#ConnexionModule' , canActivate: [NoAuthGuard] }, // , 
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard],
    children: [
      { 
        path: 'chantier', 
<<<<<<< HEAD
        loadChildren: './Composants/chantier/chantier.module#ChantierModule' 
      },
      { 
        path: 'intervention', 
        loadChildren: './Composants/intervention/intervention.module#InterventionModule' 
=======
        loadChildren: './Composants/chantier/chantier.module#ChantierModule',
      },
      { 
        path: 'intervention', 
        loadChildren: './Composants/intervention/intervention.module#InterventionModule',
>>>>>>> 8d26c45... Removed Pre-Caching, Moved Dialogues in Components
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
  },
  { path: '', redirectTo: '/accueil/chantier', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
