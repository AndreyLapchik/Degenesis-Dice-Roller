import { NgModule } from "@angular/core";

import { ConnexionRoutes } from "./connexion.routing";
import { ConnexionComponent } from "./connexion.component";
import { SharedModule } from "../../shared.module";

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
