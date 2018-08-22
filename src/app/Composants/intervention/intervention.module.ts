import { NgModule } from '@angular/core';
import { SignaturePadModule } from 'angular2-signaturepad';

import { DateTimePipe } from '../../Pipe/dateTime.pipe';
import { InterventionFiltrePipe } from '../../Pipe/interventionFiltre.pipe';
import { InterventionSearchPipe } from '../../Pipe/interventionSearch.pipe';
import { SharedModule } from '../../shared.module';
import { DialogueInterventionComponent } from '../dialogues/dialogue-intervention/dialogue-intervention.component';
import { InterventionCardComponent } from './intervention-card/intervention-card.component';
import { InterventionComponent } from './intervention.component';
import { InterventionRoute } from './intervention.routing';

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
