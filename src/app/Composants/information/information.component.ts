import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from '../../utilisateur';
import { DataService } from '../../Services/data.service';
import { DialogueUtilisateurComponent } from '../dialogues/dialogue-utilisateur/dialogue-utilisateur.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  @Input()

  nom: string;
  prenom: string;
  done = false;

  isLinear = false;
  formGroup: FormGroup;


  constructor(
    private _formBuilder: FormBuilder,
    public data: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  public enregistrer() {
    this.data.utilisateur.infosOk = true;
    let sessionUser = {
      nom: this.data.utilisateur.nom,
    };
    localStorage.setItem('sessionUser', JSON.stringify(sessionUser));
  }

  public reinitialiser() {
    this.data.utilisateur.infosOk = false;
    localStorage.removeItem('sessionUser');
    let dialogRef = this.dialog.open(DialogueUtilisateurComponent, {
      width: '250px',
      disableClose: true,
      closeOnNavigation: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data.utilisateur.nom = result;
      this.data.utilisateur.infosOk = true;
      let sessionUser = {
        nom: this.data.utilisateur.nom,
      };
      localStorage.setItem('sessionUser', JSON.stringify(sessionUser));
    });
  }
}
