import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

import { DialogueUtilisateurComponent } from '../Composants/dialogues/dialogue-utilisateur/dialogue-utilisateur.component';
import { Utilisateur } from '../utilisateur';
import { HttpService } from './http.service';

const ANONYMOUS_USER = <Utilisateur>{
  mdp: 'ANONYMOUS'
};

@Injectable()
export class DataService {

  public authenticatedUser: BehaviorSubject<Utilisateur> = new BehaviorSubject<Utilisateur>(ANONYMOUS_USER);
  public getAuthenticatedUser(): Observable<Utilisateur> {
    return this.authenticatedUser;
  }

  constructor(
    private _http: HttpClient,
    private _router: Router,
    public dialog: MatDialog,
    private _httpService: HttpService) {
  }

  saleHash(hash: string): string {
    return Md5.hashStr('eRey4IOèm°7+S' + Md5.hashStr('fg@kU~4' + hash + '£bnES¤9.7µ') + '^mlkJz7à2¬v').toString();
  }

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
              this.getNomUtilisateur().subscribe(nom => {
                util.nom = nom;
                this.authenticatedUser.next(util);
                localStorage.setItem('utilisateur', JSON.stringify(util));
                observer.next({ result: true });
                observer.complete();
              });
            } else {
              console.log('Utilisateur pas sur le serveur');
              observer.next({ result: false, login: true });
              observer.complete();
              this.authenticatedUser.next(ANONYMOUS_USER);
            }
          },
          err => {
            // Erreur serveur
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

  // Renvoie le nom stocké en local sinon le demande
  getNomUtilisateur(): Observable<string> {
    return Observable.create(observer => {
      let nom = localStorage.getItem('nom');
      if (nom && nom !== '') {
        // On a le nom de l'utilisateur stocké en local
        observer.next(nom);
        observer.complete();
      } else {
        // On n'a pas le nom, on demande à l'utilisateur
        let dialogRef = this.dialog.open(DialogueUtilisateurComponent, {
          width: '250px',
          disableClose: true,
          closeOnNavigation: false
        });
        dialogRef.afterClosed().subscribe(nom => {
          localStorage.setItem('nom', nom);
          observer.next( nom );
          observer.complete();
        });
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
