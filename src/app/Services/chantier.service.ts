import { Injectable } from '@angular/core';
import { Chantier } from '../Chantier';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import "rxjs/add/observable/of";
import { Utilisateur } from '../utilisateur';

@Injectable({
  providedIn: 'root'
})
export class ChantierService {

  //chantiers: Chantier[] = [];
  public chantiers: BehaviorSubject<Chantier[]> = new BehaviorSubject(JSON.parse(localStorage.getItem('chantiers')));

  constructor(
    private _data: DataService,
    private _http: HttpClient,
    public httpService: HttpService
  ) { }

  public getChantiers() {   
    this._data.getAuthenticatedUser().subscribe(user => {
      
      if (user && Utilisateur.rempli(user)) {
        console.log("Récupération des chantiers sur le serveur");        
        this._http.get<Chantier[]>(this.httpService.GET_CHANTIER + user.code).subscribe(
          (chantiers: Chantier[]) => {
            // On ne met à jour les chantiers que s'il sont différents
            let chantiersJSON = JSON.stringify(chantiers);
            if (chantiers && (localStorage.getItem('chantiers') !== chantiersJSON)) {
              console.log("Chantiers différents : mise à jour");
              localStorage.setItem('chantiers', chantiersJSON);
              this.chantiers.next(chantiers);
            }
          },
          (err) => {
            console.log("Impossible de joindre le serveur");
          }
        );
      }
    });
  }
}
