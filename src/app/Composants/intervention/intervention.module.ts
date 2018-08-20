import { NgModule } from "@angular/core";

import { InterventionRoute } from "./intervention.routing";
import { InterventionComponent } from "./intervention.component";
import { InterventionCardComponent } from "./intervention-card/intervention-card.component";
import { InterventionSearchPipe } from "../../Pipe/interventionSearch.pipe";
import { InterventionFiltrePipe } from "../../Pipe/interventionFiltre.pipe";
import { SignaturePadModule } from "angular2-signaturepad";
import { DateTimePipe } from "../../Pipe/dateTime.pipe";
import { DialogueInterventionComponent } from "../dialogues/dialogue-intervention/dialogue-intervention.component";
import { SharedModule } from "../../shared.module";

@NgModule({
    imports: [
        InterventionRoute,
        SignaturePadModule,
        SharedModule
    ],
    declarations: [
        InterventionComponent,
        InterventionCardComponent,
        InterventionSearchPipe,
        InterventionFiltrePipe,
        DateTimePipe,
        DialogueInterventionComponent
    ],
    entryComponents: [
        DialogueInterventionComponent
    ]
})
export class InterventionModule { }
