// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { Observable, BehaviorSubject } from 'rxjs';

// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

// LOCAL
import { Utilisateur } from '../utilisateur';

import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { MatDialog } from '../../../node_modules/@angular/material';
import { DialogueUtilisateurComponent } from '../Composants/dialogues/dialogue-utilisateur/dialogue-utilisateur.component';

class Util {
  public valid = false;
  public login: string;
  public mdp: string;
  constructor(
  ) { }
}

// class Util2 {
//   public login: string;
//   public mdp: string;
//   public code: string;
//   public nom: string;

//   util.rempli(util): boolean {
//     if (
//       this.login && this.login != '' && 
//       this.mdp && this.mdp != '' && 
//       this.code && this.code != '' &&
//       this.nom && this.nom != ''
//       ) { return true; }
//     return false;
//   }
//   constructor(
//   ) { }
// }

// const ANONYMOUS_USER = <Utilisateur>{
//   util.rempli(util): true,
//   code: 'Anonymous'
// };

const ANONYMOUS_USER = <Utilisateur>{
  mdp: 'ANONYMOUS'
};

@Injectable()
export class DataService {

  // public utilisateur: Utilisateur;

  public authenticatedUser: BehaviorSubject<Utilisateur> = new BehaviorSubject<Utilisateur>(ANONYMOUS_USER);

  public getAuthenticatedUser(): Observable<Utilisateur> {
    // console.log("GetAuthenticateduser : ");
    // console.log(this.authenticatedUser.value);
    return this.authenticatedUser;
  }

  // protected authenticatedUser: BehaviorSubject<Util2> = new BehaviorSubject<Util2>(ANONYMOUS_USER);

  // public getAuthenticatedUser(): Observable<Util2> {
  //   return this.authenticatedUser;
  // }

  constructor(
    private _http: HttpClient,
    private _router: Router,
    public dialog: MatDialog,
    private _httpService: HttpService) {
  }

  saleHash(hash: string): string {
    return Md5.hashStr('eRey4IOèm°7+S' + Md5.hashStr('fg@kU~4' + hash + '£bnES¤9.7µ') + '^mlkJz7à2¬v').toString();
  }

  // login2(login?: string, mdp?: string): Observable<any> {
  //   return Observable.create(observer => {
  //     let util = new Utilisateur;

  //     // Connexion via la page de connexion
  //     if ((login && login.length > 0) && (mdp && mdp.length > 0)) {
  //       console.log('Login in with connexion module');
  //       util.login = login;
  //       util.mdp = this.saleHash(mdp);
  //       this.loginToServer(util).subscribe(
  //         code => {
  //           if (code && code !== '') {
  //             console.log('Utilisateur trouvé sur le serveur');
  //             this.utilisateur = new Utilisateur(code);
  //             this.manage(this.utilisateur);
  //             this.authenticatedUser.next(this.utilisateur);
  //             let newSessionObject = {
  //               SessionData: {
  //                 login: util.login,
  //                 mdp: util.mdp,
  //                 code: this.utilisateur.code
  //               }
  //             };
  //             localStorage.setItem('sessionObject', JSON.stringify(newSessionObject));
  //             observer.next({ result: true });
  //             observer.complete();
  //           } else {
  //             console.log('Utilisateur pas sur le serveur');
  //             observer.next({ result: false, login: true });
  //             observer.complete();
  //             this.authenticatedUser.next(ANONYMOUS_USER);
  //           }
  //         },
  //         err => {
  //           // Permet de savoir si l'authentification a été refusée à cause des identifiants
  //           // ou d'une erreur serveur
  //           observer.next({ result: false, login: false });
  //         }
  //       );
  //     } else {
  //       let sessionObject = JSON.parse(localStorage.getItem('sessionObject'));
  //       if (sessionObject && sessionObject.SessionData.login !== '' && sessionObject.SessionData.mdp !== '' && sessionObject.SessionData.code !== '') {
  //         observer.next({ result: true });
  //         observer.complete();

  //         if (this.authenticatedUser.value.util.rempli(util)) {
  //           this.utilisateur = new Utilisateur(sessionObject.SessionData.code);
  //           this.manage(this.utilisateur);
  //           this.authenticatedUser.next(this.utilisateur);
  //         }
  //       } else {
  //         observer.next({ result: false });
  //         observer.complete();
  //         this.authenticatedUser.next(ANONYMOUS_USER);
  //       }
  //     }
  //   });
  // }

  login(login?: string, mdp?: string): Observable<any> {
    return Observable.create(observer => {
      if ((login && login.length > 0) && (mdp && mdp.length > 0)) {
        let util = new Utilisateur();
        util.login = login;
        util.mdp = this.saleHash(mdp);
        this.loginToServer(util).subscribe(
          code => {
            if (code && code !== '') {
              // Les login sont corrects
              util.code = code;
              let nom = localStorage.getItem('nom');
              if (nom) {
                // On a le nom de l'utilisateur stocké en local
                util.nom = nom;
                this.authenticatedUser.next(util);
                localStorage.setItem('utilisateur', JSON.stringify(util));
                observer.next({ result: true });
                observer.complete();
              } else {
                // On n'a pas le nom, on demande à l'utilisateur
                let dialogRef = this.dialog.open(DialogueUtilisateurComponent, {
                  width: '250px',
                  disableClose: true,
                  closeOnNavigation: false
                });
                dialogRef.afterClosed().subscribe(result => {
                  util.nom = result;
                  localStorage.setItem('nom', result);
                  this.authenticatedUser.next(util);
                  localStorage.setItem('utilisateur', JSON.stringify(util));
                  observer.next({ result: true });
                  observer.complete();
                });
              }
            } else {
              console.log('Utilisateur pas sur le serveur');
              observer.next({ result: false, login: true });
              observer.complete();
              this.authenticatedUser.next(ANONYMOUS_USER);
            }
          },
          err => {
            // Permet de savoir si l'authentification a été refusée à cause des identifiants
            // ou d'une erreur serveur
            observer.next({ result: false, login: false });
          }
        );
      } else {
        // Connexion automatique
        let util: Utilisateur = JSON.parse(localStorage.getItem('utilisateur'));    
        if (util && Utilisateur.rempli(util)) {
          // On met à jour l'utilisateur si l'utilisateur actuelle est anonyme
          if (!Utilisateur.rempli(this.authenticatedUser.value)) {         
            this.authenticatedUser.next(util);
          }                
          console.log("Connexion automatique : OK");
          observer.next({ result: true });
          observer.complete();
        } else {
          console.log("Connexion automatique : PAS OK");
          observer.next({ result: false });
          observer.complete();
          this.authenticatedUser.next(ANONYMOUS_USER);
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem("utilisateur");
    this.authenticatedUser.next(ANONYMOUS_USER);
    this._router.navigate(["/connexion"]);
  }

  public loginToServer(ut: any): Observable<any> {
    return this._http.post(this._httpService.LOGIN, JSON.stringify(ut));
  }
}
