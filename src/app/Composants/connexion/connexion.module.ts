import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { ConnexionComponent } from './connexion.component';
import { ConnexionRoutes } from './connexion.routing';

@NgModule({
    imports: [
        ConnexionRoutes,
        SharedModule
    ],
    declarations: [
        ConnexionComponent
    ]
})
export class ConnexionModule { }
