import { Component, Inject, AfterViewInit, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

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

  constructor(
    public dialogRef: MatDialogRef<DialogueConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.date = data.date;
     }

   date: Date;


  submitDate() {    
    this.dialogRef.close({dateAppel: this.date, typeinter: this.typeinter});
  }
}
