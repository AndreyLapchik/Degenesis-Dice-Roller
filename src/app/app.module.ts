import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './Classes/AuthGuard';
import { AccueilMenuComponent } from './Composants/accueil/accueil-menu/accueil-menu.component';
import { AccueilComponent } from './Composants/accueil/accueil.component';
import { DialogueCarteComponent } from './Composants/dialogues/dialogue-carte/dialogue-carte.component';
import { DialogueUtilisateurComponent } from './Composants/dialogues/dialogue-utilisateur/dialogue-utilisateur.component';
import { NoAuthGuard } from './Classes/NoAuthGuard';
import { ChantierService } from './Services/chantier.service';
import { DataService } from './Services/data.service';
import { Configuration, HttpService } from './Services/http.service';
import { IndexedDBService } from './Services/indexedDB.service';
import { InterventionService } from './Services/intervention.service';
import { SharedModule } from './shared.module';

// LOCAL
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
