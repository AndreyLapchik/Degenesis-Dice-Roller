import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { DialogueUtilisateurComponent } from '../dialogues/dialogue-utilisateur/dialogue-utilisateur.component';
import { MatDialog } from '@angular/material';
import { Utilisateur } from '../../utilisateur';

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
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  public enregistrer() {

  }

  public reinitialiser() {
    let dialogRef = this.dialog.open(DialogueUtilisateurComponent, {
      width: '250px',
      disableClose: true,
      closeOnNavigation: false
    });

    dialogRef.afterClosed().subscribe(result => {
      localStorage.setItem('nom', result);
      this.data.authenticatedUser.value.nom = result;
      localStorage.setItem('utilisateur', JSON.stringify(this.data.authenticatedUser.value));
    });
  }
}
