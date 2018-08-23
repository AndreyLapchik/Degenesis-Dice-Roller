import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { Chantier } from '../Classes/Chantier';
import { Intervention } from '../Classes/Intervention';
import { DateTimePipe } from '../Pipe/dateTime.pipe';
import { Utilisateur } from '../Classes/Utilisateur';
import { DataService } from './data.service';
import { HttpService } from './http.service';
import { IndexedDBService } from './indexedDB.service';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  interventions: Intervention[] = [];
  nbInterTemp: number = 0;

  constructor(
    private _data: DataService,
    private _http: HttpClient,
    public httpService: HttpService,
    public indexedDB: IndexedDBService,
    public snackBar: MatSnackBar
  ) { }

  // Récuperer les interventions stockées en local
  getLocalInterventions() {
    this.interventions = JSON.parse(localStorage.getItem('interventions'));
    if (!(this.interventions && this.interventions.length > 0)) {
      // On tente quand même de récupérer des interventions du serveur
      // au cas où l'utilisateur aurait supprimé son cache
      this.getInterventionsFromServer();
    }
  }

  // Pour savoir si l'utilsateur à déja une intervention en cours
  isInterventionEnCours(): boolean {
    if (!this.interventions || this.interventions.length == 0) {
      return false;
    }
    let inter = this.interventions.filter(intervention => {
      return (intervention.statut == "1" || intervention.statut == "2");
    });
    return (inter && inter.length > 0);
  }

  // On crée un nouvelle intervention sur un chantier
  // On l'ajoute à la liste des interventions
  // On sauvegarde l'intervention en local
  // Et on la transmet au serveur
  insertIntervention(chantier: Chantier, date: Date, typeinter: string) {
    if (date) {
      let inter = new Intervention();
      inter.idchantier = chantier.id;
      inter.codecli = chantier.codecli;
      inter.nomcli = chantier.nomcli;
      inter.nom = chantier.nom;
      inter.adr1 = chantier.adr1;
      inter.adr2 = chantier.adr2;
      inter.adr3 = chantier.adr3;
      inter.cp = chantier.cp;
      inter.ville = chantier.ville;
      inter.pays = chantier.pays;
      inter.codeope = this._data.authenticatedUser.value.code;
      inter.intervenant = this._data.authenticatedUser.value.nom;
      inter.dateinter = formatDate(new Date(), "dd/MM/yyyy", "fr");
      inter.dateappel = date.toISOString();
      inter.statut = '1';
      inter.typeinter = typeinter;
      inter.nombd = chantier.nombd;

      if (!this.interventions) {
        this.interventions = [];
      }
      this.interventions.push(inter);
      this.saveInterventions();
      this.pushInterventionToServer(inter);
    }
  }

  // Pour récupérer les interventions non terminées de l'utilisateur sur le serveur
  getInterventionsFromServer() {
    this._data.getAuthenticatedUser().subscribe(user => {
      if (user && Utilisateur.rempli(user)) {
        this.getInterventions(user).subscribe(
          (interventions: Intervention[]) => {
            console.log("Récupération des interventions sur le serveur");
            if (interventions && interventions.length > 0) {
              let date = new DateTimePipe();
              interventions.forEach(inter => {
                inter.dateappel = date.transform(inter.dateappel);
                inter.datearrive = date.transform(inter.datearrive);
                inter.datedepart = date.transform(inter.datedepart);
              });
              console.log(interventions);
              localStorage.setItem('interventions', JSON.stringify(interventions));
              this.interventions = interventions;
            }
          },
          (err) => {
            console.log("Impossible de joindre le serveur");
            localStorage.removeItem('interventions');
            this.interventions = [];
          }
        );
      }
    });
  }

  // Sauvegarde toutes les interventions en local
  public saveInterventions() {
    localStorage.setItem('interventions', JSON.stringify(this.interventions));
  }

  // Supprimer une intervention
  public deleteIntervention(inter: Intervention) {
    this.interventions = this.interventions.filter(item => (
      item.idchantier !== inter.idchantier &&
      item.dateappel !== inter.dateappel
    ));
    this.saveInterventions();
  }

  // Recuperer les interventions du serveur
  public getInterventions(user: Utilisateur): Observable<Intervention[]> {
    return this._http.get<Intervention[]>(this.httpService.GET_INTERVENTION + user.code + '/' + user.nom);
  }

  // On envoie une intervention sur le serveur
  public pushInterventionToServer(intervention: Intervention) {
    this._http.post(this.httpService.PUSH_INTERVENTION, JSON.stringify(intervention)).subscribe(
      data => {
        if (intervention.statut === '4') {
          this.indexedDB.validatePhotos(intervention).then(() => {
            this.pushPhotosToServer(intervention);
          }, (err) => {
            console.log(err);
          });

          if (this.nbInterTemp > 0) {
            this.nbInterTemp--;
          }
          this.snackBar.open("Intervention envoyée avec succès.", "", {
            duration: 3000,
          });
          this.deleteIntervention(intervention);
        }
        this.saveInterventions();
      },
      err => {
        console.log(err);
        if (intervention.statut === '4') {
          this.nbInterTemp++;
          this.snackBar.open("L'intervention sera envoyée quand la connexion sera revenue.", "", {
            duration: 3000,
          });
        }
        console.log("intervention sauvegardée");
        this.saveInterventions();
      }
    );
  }

  public pushPhotosToServer(inter: Intervention) {
    console.log("Envoi des photos");
    this.indexedDB.getInterPhotos(inter, 1).then(photos => {
      console.log("envoi de photo(s)");
      photos.forEach(photo => {
        this._http.post(this.httpService.PUSH_PHOTO, JSON.stringify(photo)).subscribe(
          res => {
            console.log("Photo correctement envoyée");
            this.indexedDB.database.delete('Photos', photo.id);
          },
          err => {
            console.log(err);
          });
      });
    }, err => {
      console.log(err);
    });
  }

  public pushAllPhotosToServer() {
    console.log("Envoi des photos");
    this.indexedDB.getPhotos(1).then(photos => {
      console.log(photos);

      photos.forEach(photo => {
        this._http.post(this.httpService.PUSH_PHOTO, JSON.stringify(photo)).subscribe(
          res => {
            console.log("Photo correctement envoyée");
            this.indexedDB.database.delete('Photos', photo.id);
          },
          err => {
            console.log(err);
          });
      });
    }, err => {
      console.log(err);
    });
  }

  // On tente d'envoyer les interventions avant de se déconnecter
  public logout() {
    this.pushInterventionsCompletes();
    this._data.logout();
  }

  // Pour envoyer toutes les interventions terminées (statut = 4)
  public pushInterventionsCompletes() {
    if (this.interventions) {
      this.nbInterTemp = 0;
      this.interventions.filter(inter => inter.statut === "4").forEach(inter => {
        console.log("une intervention trouvé");
        this.pushInterventionToServer(inter);
      });
    }
  }
}
