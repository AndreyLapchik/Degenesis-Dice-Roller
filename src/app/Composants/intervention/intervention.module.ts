import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkTableModule } from "@angular/cdk/table";
import { FormsModule } from "@angular/forms";

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
        SignaturePadModule
    ],
    declarations: [
        InterventionComponent,
        InterventionCardComponent,
        InterventionSearchPipe,
        InterventionFiltrePipe,
        DateTimePipe
    ]
})
export class InterventionModule { }
