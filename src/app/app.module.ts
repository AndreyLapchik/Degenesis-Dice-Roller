import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// Service Worker
import { ServiceWorkerModule } from '@angular/service-worker';

// LOCAL
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AccueilComponent } from './Composants/accueil/accueil.component';
import { IndexedDBService } from './Services/indexedDB.service';
import { DataService } from './Services/data.service';
//import { CoreModule } from './core/core.module';
import { AccueilMenuComponent } from './Composants/accueil-menu/accueil-menu.component';
import { AuthGuard } from './AuthGuard';
import { NoAuthGuard } from './NoAuthGuard';


import { DialogueUtilisateurComponent } from './Composants/dialogues/dialogue-utilisateur/dialogue-utilisateur.component';
import { DialogueInterventionComponent } from './Composants/dialogues/dialogue-intervention/dialogue-intervention.component';
import { DialogueErreurComponent } from './Composants/dialogues/dialogue-erreur/dialogue-erreur.component';

import { InterventionService } from './Services/intervention.service';

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
import { DialogueConfirmationComponent } from './Composants/dialogues/dialogue-confirmation/dialogue-confirmation.component';

import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpService, Configuration } from './Services/http.service';
import { DialogueCarteComponent } from './Composants/dialogues/dialogue-carte/dialogue-carte.component';
import { environment } from '../environments/environment';
import { ChantierService } from './Services/chantier.service';

@NgModule({
  entryComponents: [
    DialogueUtilisateurComponent,
    DialogueInterventionComponent,
    DialogueErreurComponent,
    DialogueConfirmationComponent,
    DialogueCarteComponent,
    AccueilComponent
  ],
  declarations: [
    AppComponent,
    // ConnexionComponent,
    AccueilComponent,
    AccueilMenuComponent,
    // ChantierComponent,
    // ChantierCardComponent,
    // InterventionComponent,
    // InterventionCardComponent,
    // InformationComponent,
    DialogueUtilisateurComponent,
    DialogueInterventionComponent,
    DialogueErreurComponent,
    DialogueConfirmationComponent,
    DialogueCarteComponent,
    // InterventionFiltrePipe,
    // ChantierSearchPipe,
    // InterventionSearchPipe,
    // DateTimePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    AppRoutingModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    SignaturePadModule,
    // VirtualScrollModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    DataService,
    IndexedDBService,
    InterventionService,
    ChantierService,
    Configuration,
    AuthGuard,
    NoAuthGuard,
    HttpService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeFr);
