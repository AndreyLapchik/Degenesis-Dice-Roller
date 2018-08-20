import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ServiceWorkerModule } from '@angular/service-worker';

// LOCAL
import { AppComponent } from './app.component';
import { AccueilComponent } from './Composants/accueil/accueil.component';
import { AccueilMenuComponent } from './Composants/accueil-menu/accueil-menu.component';
import { DialogueUtilisateurComponent } from './Composants/dialogues/dialogue-utilisateur/dialogue-utilisateur.component';
import { DialogueCarteComponent } from './Composants/dialogues/dialogue-carte/dialogue-carte.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';

import { IndexedDBService } from './Services/indexedDB.service';
import { DataService } from './Services/data.service';
import { InterventionService } from './Services/intervention.service';
import { HttpService, Configuration } from './Services/http.service';
import { ChantierService } from './Services/chantier.service';

import { AuthGuard } from './AuthGuard';
import { NoAuthGuard } from './NoAuthGuard';
import { environment } from '../environments/environment';

@NgModule({
  entryComponents: [
    DialogueUtilisateurComponent,
    DialogueCarteComponent,
    AccueilComponent
  ],
  declarations: [
    AppComponent,
    AccueilComponent,
    AccueilMenuComponent,
    DialogueUtilisateurComponent,
    DialogueCarteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
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
