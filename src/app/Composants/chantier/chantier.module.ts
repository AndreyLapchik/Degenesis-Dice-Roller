import { NgModule } from '@angular/core';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { ChantierSearchPipe } from '../../Pipe/chantierSearch.pipe';
import { SharedModule } from '../../shared.module';
import { DialogueConfirmationComponent } from '../dialogues/dialogue-confirmation/dialogue-confirmation.component';
import { DialogueErreurComponent } from '../dialogues/dialogue-erreur/dialogue-erreur.component';
import { ChantierCardComponent } from './chantier-card/chantier-card.component';
import { ChantierComponent } from './chantier.component';
import { ChantierRoutes } from './chantier.routing';


@NgModule({
    imports: [
        SharedModule,
        ChantierRoutes,
        VirtualScrollModule
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
