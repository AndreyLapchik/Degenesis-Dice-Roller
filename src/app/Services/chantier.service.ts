import { Injectable } from '@angular/core';
import { Chantier } from '../Chantier';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { ReplaySubject } from 'rxjs';
import "rxjs/add/observable/of";

@Injectable({
  providedIn: 'root'
})
export class ChantierService {

  //chantiers: Chantier[] = [];
  public chantiers: ReplaySubject<Chantier[]> = new ReplaySubject(1);

  constructor(
    private _data: DataService,
    private _http: HttpClient,
    public httpService: HttpService
  ) { }


  public getChantiers() {
    this._data.getAuthenticatedUser().subscribe(user => {
      if (!user.isAnonymous) {
        this._http.get<Chantier[]>(this.httpService.GET_CHANTIER + user.code).subscribe(
          (chantiers: Chantier[]) => {
            if (chantiers && chantiers.length > 0) {
              console.log("Récupération des chantiers sur le serveur");
              localStorage.setItem('chantiers', JSON.stringify(chantiers));
              this.chantiers.next(chantiers);
            }
          },
          (err) => {
            console.log("Impossible de joindre le serveur");
            console.log("Récupération des chantiers en local ");
            let chantiers: Chantier[] = JSON.parse(localStorage.getItem('chantiers'));
            this.chantiers.next(chantiers);
          }
        );
      }
    });
  }
}
