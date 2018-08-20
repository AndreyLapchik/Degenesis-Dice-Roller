import { NgModule } from "@angular/core";

import { ChantierRoutes } from "./chantier.routing";
import { ChantierComponent } from "./chantier.component";
import { ChantierSearchPipe } from "../../Pipe/chantierSearch.pipe";
import { ChantierCardComponent } from "./chantier-card/chantier-card.component";
import { DialogueConfirmationComponent } from "../dialogues/dialogue-confirmation/dialogue-confirmation.component";
import { DialogueErreurComponent } from "../dialogues/dialogue-erreur/dialogue-erreur.component";
import { SharedModule } from "../../shared.module";

@NgModule({
    imports: [
        SharedModule,
        ChantierRoutes,
    ],
    declarations: [
        ChantierComponent,
        ChantierCardComponent,
        ChantierSearchPipe,
        DialogueConfirmationComponent,
        DialogueErreurComponent
    ],
    entryComponents: [
        DialogueConfirmationComponent,
        DialogueErreurComponent
    ]
})
export class ChantierModule { }
