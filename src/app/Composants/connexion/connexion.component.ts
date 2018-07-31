// ANGULAR
import { Component, Input } from '@angular/core';
//import { Location } from '@angular/common';
import { Router } from '@angular/router';

// LOCAL
import { IndexedDBService } from '../../Services/indexedDB.service';
import { DataService } from '../../Services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  login = new FormControl('', [Validators.required]);
  mdp = new FormControl('', [Validators.required]);

  spinnerVisible = false;
  mdpVisible = false;



  constructor(
    protected bddIndexedDbService: IndexedDBService,
    private _data: DataService,
    private _router: Router,
    public sanitizer: DomSanitizer,
    public snackBar: MatSnackBar
  ) { }

  onSubmit() {
    if (this.login.value && this.mdp.value) {
      this.spinnerVisible = true;
      this._data.login(this.login.value, this.mdp.value).subscribe(
        res => {
          if (res.result) {
            // Les identifiants sont bons
            this._router.navigate(["accueil"]);
          } else {
            if (res.login) {
              this.snackBar.open("Les identifiants sont incorrects", "", {
                duration: 2000,
              });
            } else {
              this.snackBar.open("Serveur inaccessible, veuillez réessayer plus tard.", "", {
                duration: 2000,
              });
            }
          }
          this.spinnerVisible = false;
        }
      );
    }
  }
}

