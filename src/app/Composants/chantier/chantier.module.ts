import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { ChantierRoutes } from "./chantier.routing";
import { ChantierComponent } from "./chantier.component";
import { CdkTableModule } from "@angular/cdk/table";
import { FormsModule } from "@angular/forms";
import { ChantierSearchPipe } from "../../Pipe/chantierSearch.pipe";
import { ChantierCardComponent } from "./chantier-card/chantier-card.component";
import { VirtualScrollModule } from "angular2-virtual-scroll";

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
        FormsModule,
        VirtualScrollModule
    ],
    declarations: [
        ChantierComponent,
        ChantierCardComponent,
        ChantierSearchPipe
    ]
})
export class ChantierModule { }
