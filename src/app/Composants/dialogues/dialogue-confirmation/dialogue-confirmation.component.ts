import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialogue-confirmation',
  templateUrl: './dialogue-confirmation.component.html',
  styleUrls: ['./dialogue-confirmation.component.css']
})
export class DialogueConfirmationComponent {

  typesInter = [
    { label: 'Gardiennage', value: 'G' },
    { label: 'Intervention', value: 'I' },
    { label: 'Ronde', value: 'R' },
    { label: 'Alarme', value: 'A' }
  ];

  typeinter: string;
  date: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogueConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.date = data.date;
  }

  submitDate() {
    this.dialogRef.close({ dateAppel: this.date, typeinter: this.typeinter });
  }
}
