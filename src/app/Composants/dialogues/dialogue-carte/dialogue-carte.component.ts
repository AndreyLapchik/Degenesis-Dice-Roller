import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MapsService } from '../../../Services/maps.service';

@Component({
  selector: 'app-dialogue-carte',
  templateUrl: './dialogue-carte.component.html',
  styleUrls: ['./dialogue-carte.component.css']
})

export class DialogueCarteComponent {

  lien: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogueCarteComponent>,
    public maps: MapsService,
    public sanitizer: DomSanitizer,

    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.maps.getTrajet(data.chantier).subscribe(adresse => {
      if (adresse) {
        this.lien = adresse;
      }
    });
  }
}

