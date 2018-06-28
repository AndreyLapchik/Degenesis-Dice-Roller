import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Intervention } from '../Intervention';
import { Chantier } from '../Chantier';
import { Observable } from 'rxjs';
import { Utilisateur } from '../utilisateur';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { DateTimePipe } from '../Pipe/dateTime.pipe';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  interventions: Intervention[] = [];

  constructor(
    private _data: DataService,
    private _http: HttpClient,
    public httpService: HttpService
  ) { }

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
      inter.codeope = this._data.utilisateur.code;
      inter.intervenant = this._data.utilisateur.nom;
      inter.dateinter = formatDate(new Date(), "dd/MM/yyyy", "fr");
      inter.dateappel = date.toISOString();
      inter.statut = '1';
      inter.typeinter = typeinter;

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
      if (!user.isAnonymous) {
        this.getInterventions(this._data.utilisateur).subscribe(
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

  public deleteIntervention(inter: Intervention) {
    console.log("avant: ");
    console.log(this.interventions);

    //this.interventions = this.interventions.splice(this.interventions.indexOf(inter), 1);
    this.interventions = this.interventions.filter(item => (item.idchantier !== inter.idchantier && item.dateappel !== inter.dateappel));
    console.log("apres: ");
    console.log(this.interventions);

    this.saveInterventions();
  }

  public getInterventions(user: Utilisateur): Observable<Intervention[]> {
    return this._http.get<Intervention[]>(this.httpService.GET_INTERVENTION + user.code + '/' + user.nom);

  }

  // On envoit une intervention sur le serveur
  public pushInterventionToServer(intervention: Intervention) {
    this._http.post(this.httpService.PUSH_INTERVENTION, JSON.stringify(intervention)).subscribe(
      data => {
        if (intervention.statut === '4') {
          console.log("intervention supprimée");

          this.deleteIntervention(intervention);
        }
        this.saveInterventions();
      },
      err => {
        console.log(err);
        console.log("intervention sauvegardée");
        this.saveInterventions();
      }
    );
  }

  public logout() {
    this.pushInterventionsCompletes();
    this._data.logout();
  }

  public pushInterventionsCompletes() {
    if (this.interventions) {
      this.interventions.filter(inter => inter.statut === "4").forEach(inter => {
        console.log("une intervention trouvé");

        this.pushInterventionToServer(inter);
      });
    }
  }


}
