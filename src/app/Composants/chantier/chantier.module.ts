import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { ChantierRoutes } from "./chantier.routing";
import { ChantierComponent } from "./chantier.component";
import { CdkTableModule } from "@angular/cdk/table";
import { FormsModule } from "@angular/forms";
import { ChantierSearchPipe } from "../../Pipe/chantierSearch.pipe";
import { ChantierCardComponent } from "./chantier-card/chantier-card.component";

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
import { DialogueConfirmationComponent } from "../dialogues/dialogue-confirmation/dialogue-confirmation.component";
import { DialogueErreurComponent } from "../dialogues/dialogue-erreur/dialogue-erreur.component";

@NgModule({
    imports: [
        CommonModule,
        ChantierRoutes,
        CommonModule,
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
        FormsModule
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