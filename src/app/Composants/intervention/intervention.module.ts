import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkTableModule } from "@angular/cdk/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatBadgeModule
} from '@angular/material';

import { InterventionRoute } from "./intervention.routing";
import { InterventionComponent } from "./intervention.component";
import { InterventionCardComponent } from "./intervention-card/intervention-card.component";
import { InterventionSearchPipe } from "../../Pipe/interventionSearch.pipe";
import { InterventionFiltrePipe } from "../../Pipe/interventionFiltre.pipe";
import { SignaturePadModule } from "angular2-signaturepad";
import { DateTimePipe } from "../../Pipe/dateTime.pipe";
import { DialogueInterventionComponent } from "../dialogues/dialogue-intervention/dialogue-intervention.component";

@NgModule({
    imports: [
        CommonModule, 
        InterventionRoute,
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatBadgeModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        SignaturePadModule
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
