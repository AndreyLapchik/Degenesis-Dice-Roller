// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';

// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';


import { IndexedDBService } from './indexedDB.service';

// LOCAL
import { Utilisateur } from '../utilisateur';
import { Chantier } from '../Chantier';

import { Router } from '@angular/router';
import { HttpService } from './http.service';

class Util {
  public valid = false;
  public login: string;
  public mdp: string;
  constructor(
  ) { }
}

class Inter {
  idchantier: number;
  codecli: string;
  nomcli: string;
  nom: string;
  adr1: string;
  adr2: string;
  adr3: string;
  cp: string;
  ville: string;
  pays: string;
  codeope: string;
  intervenant: string;
  dateinter: Date;
  dateappel: string;
  constructor() { }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const ANONYMOUS_USER = <Utilisateur>{
  isAnonymous: true,
  code: 'Anonymous'
};

@Injectable()
export class DataService {

  //private actionUrl: string;

  public utilisateur: Utilisateur;

  public navbar = false;

  protected authenticatedUser: BehaviorSubject<Utilisateur> = new BehaviorSubject<Utilisateur>(ANONYMOUS_USER);

  public getAuthenticatedUser(): Observable<Utilisateur> {
    return this.authenticatedUser;
  }

  constructor(
    private _indexedDB: IndexedDBService,
    private _http: HttpClient,

    private _router: Router,
    private _httpService: HttpService) {

    //if (config) { this.utilisateur = new Utilisateur(config.login); }
  }

  saleHash(hash: string): string {
    return Md5.hashStr('eRey4IOèm°7+S' + Md5.hashStr('fg@kU~4' + hash + '£bnES¤9.7µ') + '^mlkJz7à2¬v').toString();
  }

  login(login?: string, mdp?: string): Observable<boolean> {
    return Observable.create(observer => {
      let util = new Util;

      // Connexion via la page de connexion
      if ((login && login.length > 0) && (mdp && mdp.length > 0)) {
        console.log('Login in with connexion module');
        util.login = login;
        util.mdp = this.saleHash(mdp);
        console.log(util.mdp);
        this.loginToServer(util)
          .subscribe(code => {
            if (code && code !== '') {
              console.log('Utilisateur trouvé sur le serveur');
              this.utilisateur = new Utilisateur(code);
              this._indexedDB.manage(this.utilisateur);
              this.authenticatedUser.next(this.utilisateur);
              let newSessionObject = {
                SessionData: {
                  login: util.login,
                  mdp: util.mdp,
                  code: this.utilisateur.code
                }
              };
              localStorage.setItem('sessionObject', JSON.stringify(newSessionObject));
              observer.next(true);
              observer.complete();
            } else {
              console.log('Utilisateur pas sur le serveur');
              observer.next(false);
              observer.complete();
              this.authenticatedUser.next(ANONYMOUS_USER);
            }
          });
      } else {
        let sessionObject = JSON.parse(localStorage.getItem('sessionObject'));
        if (sessionObject && sessionObject.SessionData.login !== '' && sessionObject.SessionData.mdp !== '' && sessionObject.SessionData.code !== '') {
          this.utilisateur = new Utilisateur(sessionObject.SessionData.code);
          this._indexedDB.manage(this.utilisateur);
          observer.next(true);
          observer.complete();
          this.authenticatedUser.next(this.utilisateur);
        } else {
          observer.next(false);
          observer.complete();
          this.authenticatedUser.next(ANONYMOUS_USER);
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem("sessionObject");
    this.authenticatedUser.next(ANONYMOUS_USER);
    this._router.navigate(["/connexion"]);
  }

  public getChantiers(user: Utilisateur): Observable<Chantier[]> {
    return this._http.get<Chantier[]>(this._httpService.GET_CHANTIER + user.code)
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        return [];
      }
      );
  }
  //     if (error) {
  //       console.log(error);
  //       return JSON.parse(localStorage.getItem('chantiers'));
  //     } else {
  //       return [];
  //     }
  //   });
  // }

  public loginToServer(ut: any): Observable<any> {
    return this._http.post(this._httpService.LOGIN, JSON.stringify(ut)); //.pipe(
    // tap(_ => console.log("tap"))
    //);
    //    map((response: Response): Utilisateur => {
    //     const json = response.json();
    //     console.log(json);
    //     const newUser = <Utilisateur>({
    //       code: json.code,
    //       isAnonymous: false
    //     });
    //     this.authenticatedUser.next(newUser);
    //     return newUser;
    //   })
    // );
  }


  handleErrorHTTP(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an ErrorObservable with a user-facing error message
    return throwError(new Error('DataService handleErrorHTTP'));
  }

}
