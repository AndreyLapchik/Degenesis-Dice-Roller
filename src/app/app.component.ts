import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { fromEvent, interval } from 'rxjs';


import { DataService } from './Services/data.service';
import { Utilisateur } from './utilisateur';
import { InterventionService } from './Services/intervention.service';
import { ChantierService } from './Services/chantier.service';
import { HttpClient } from '@angular/common/http';
import { Configuration, HttpService } from './Services/http.service';
import { IndexedDBService } from './Services/indexedDB.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  public static authOk = false;
  title = 'DAT Intervention';
  configuration: Configuration;

  @Input()
  utilisateur: Utilisateur;

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      console.log("service workers enabled");      
      // interval(20000).subscribe(() => 
      this.swUpdate.checkForUpdate();
      this.swUpdate.available.subscribe(event => {
        this.snackbar.open('Mise à jour disponible', 'Recharger', {duration: 6000})
          .onAction().subscribe(() => {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
          });     
      }); 
    }  
    this.http.get('assets/config.json').subscribe((conf: Configuration) => {
      if (conf) {
        this.data.login();
        this.httpService.actionUrl = conf.protocole + conf.server + ':' + conf.port + conf.apiUrl + conf.dossierUrl;
        this.indexedDB.createBdd().then(() => {
          console.log("pushPhotos");          
          this.interService.pushAllPhotosToServer();
        });     
        this.chantierService.getChantiers();
        this.interService.getLocalInterventions();
      }
    },
    err => {
      console.log(err);      
    });
  }

  constructor(
    protected data: DataService,
    public interService: InterventionService,
    public chantierService: ChantierService,
    public httpService: HttpService,
    public indexedDB: IndexedDBService,
    public http: HttpClient,
    public swUpdate: SwUpdate,
    public snackbar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    //évènement qui surveille la remise en ligne de l'application
    let online$ = fromEvent(window, 'online')
      .subscribe(e => {
        this.interService.pushInterventionsCompletes();
      });

    //évènement qui surveille le passage hors-ligne de l'application
    let offline$ = fromEvent(window, 'offline')
      .subscribe(e => {

      });
  }
}
