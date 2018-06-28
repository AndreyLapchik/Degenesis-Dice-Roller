import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogue-erreur',
  templateUrl: './dialogue-erreur.component.html',
  styleUrls: ['./dialogue-erreur.component.css']
})

export class DialogueErreurComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogueErreurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

