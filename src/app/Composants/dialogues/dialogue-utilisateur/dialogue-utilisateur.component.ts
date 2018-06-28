import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogue-utilisateur',
  templateUrl: './dialogue-utilisateur.component.html',
  styleUrls: ['./dialogue-utilisateur.component.css']
})
export class DialogueUtilisateurComponent {

  nom: string;
  constructor(
    public dialogRef: MatDialogRef<DialogueUtilisateurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data && data.nom) {
        this.nom = data.nom;
      }
      
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
