import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../Services/data.service';

import { InterventionService } from '../../Services/intervention.service';
import { MatDialog } from '@angular/material';
import { DialogueUtilisateurComponent } from '../dialogues/dialogue-utilisateur/dialogue-utilisateur.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  nom: string;

  constructor(
    public _data: DataService,
    public dialog: MatDialog,
    public interService: InterventionService
  ) {}


  ngOnInit() {
    // Promise destiné à éviter une erreur ExpressionChangedAfterItHasBeenCheckedError
    // setTimeout(() => {
    //   if (!this._data.utilisateur.infosOk) {      
    //     let dialogRef = this.dialog.open(DialogueUtilisateurComponent, {
    //       width: '250px',
    //       disableClose: true,
    //       closeOnNavigation: false
    //     });
    
    //     dialogRef.afterClosed().subscribe(result => {
    //       this._data.utilisateur.nom = result;
    //       this._data.utilisateur.infosOk = true;
    //       let sessionUser = {
    //         nom: this._data.utilisateur.nom,
    //       };
    //       localStorage.setItem('sessionUser', JSON.stringify(sessionUser));
    //     });
    //   } else {
        this.interService.pushInterventionsCompletes();
    //   }
    // }, 1000);


  }

}
