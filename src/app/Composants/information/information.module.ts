import { NgModule } from "@angular/core";

import { InformationRoutes } from "./information.routing";
import { InformationComponent } from "./information.component";
import { SharedModule } from "../../shared.module";

@NgModule({
    imports: [
        InformationRoutes,
        SharedModule
    ],
    declarations: [InformationComponent]
})
export class InformationModule { }
