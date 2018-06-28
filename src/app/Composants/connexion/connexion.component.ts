// ANGULAR
import { Component, Input } from '@angular/core';
//import { Location } from '@angular/common';
import { Router } from '@angular/router';

// LOCAL
import { IndexedDBService } from '../../Services/indexedDB.service';
import { DataService } from '../../Services/data.service';
import { Utilisateur } from '../../utilisateur';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  @Input()
  utilisateur: Utilisateur;

  login: string;
  mdp: string;

  spinnerVisible = false;
  mdpVisible = false;
  loginError = false;
  mdpError = false;

  constructor(
    protected bddIndexedDbService: IndexedDBService,
    private _data: DataService,
    private _router: Router,
    public sanitizer: DomSanitizer
  ) { }

  onSubmit() {
    this.spinnerVisible = true;
    this._data.login(this.login, this.mdp).subscribe(res => {
      if (res) {
        this._router.navigate(["accueil"]);
      }
      this.spinnerVisible = false;
    });
  }
}


