import { Component, OnInit, Inject, ViewChildren, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Intervention } from '../../../Intervention';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-dialogue-intervention',
  templateUrl: './dialogue-intervention.component.html',
  styleUrls: ['./dialogue-intervention.component.css']
})


export class DialogueInterventionComponent implements OnInit, AfterViewInit {

  @ViewChildren(SignaturePad) public signatures: QueryList<SignaturePad>;
  @ViewChildren('div1') public div1: QueryList<ElementRef>;
  @ViewChildren('div2') public div2: QueryList<ElementRef>;


  motifs = [
    { label: 'MES non reçus', value: '1' },
    { label: 'Intrusion', value: '2' },
    { label: 'Test cyclique non reçu', value: '3' },
    { label: 'Défaut batterie', value: '4' },
    { label: 'MHS non reçus', value: '5' },
    { label: 'Incendie', value: '6' },
    { label: 'Ronde', value: '7' },
    { label: 'Autres (préciser)', value: '8' }
  ];
  resultats = [
    { label: 'Ronde extérieure', value: '1' },
    { label: 'Ronde intérieure', value: '2' },
    { label: 'Personnel de ménage sur place', value: '3' },
    { label: 'Contrôle des accès', value: '4' },
    { label: 'Sirène en fonction', value: '5' },
    { label: 'Mauvaise manipulation', value: '6' },
    { label: 'Coupure EDF', value: '7' },
    { label: 'Aucune anomalie constatée', value: '8' },
    { label: 'Autres (préciser)', value: '9' }
  ];
  circulations = [
    { label: 'Normale', value: '1' },
    { label: 'Mauvaise', value: '2' },
    { label: 'Bouchon', value: '3' },
    { label: 'Déviation / Travaux', value: '4' }
  ];

  intervention: Intervention;

  photos: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogueInterventionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.intervention = data.intervention;
    console.log("Envoyé : ");
    console.log(this.intervention);
    if (this.intervention.photosTemp) {
      this.photos = this.intervention.photosTemp;
    }
  }

  public ngOnInit() {


  }

  public ngAfterViewInit() {
    this.signatures.first.set('canvasWidth', 200);
    this.signatures.first.set('canvasHeight', 200);


    this.signatures.last.set('canvasWidth', 200);
    this.signatures.last.set('canvasHeight', 200);


    setTimeout(() => {
      if (this.intervention.signInterTemp) {
        this.signatures.first.fromData(this.intervention.signInterTemp);
      }
      if (this.intervention.signClientTemp) {
        this.signatures.last.fromData(this.intervention.signClientTemp);
      }
    }, 500);
  }

  //////////////////////// PHOTOS ///////////////////////////////

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    let file: File = inputValue.files[0];
    console.log(file.type);
    
    if (file.type.includes("image")) {
      let myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.photos.push(myReader.result);
        console.log(this.photos);
      };
      myReader.readAsDataURL(file);

    }

  }

  //////////////////////// SIGNATURE ///////////////////////////////

  personneChange() {
    // if (this.intervention.correspondant) {
    //   this.signatures.last.set('canvasWidth', 200);
    //   this.signatures.last.set('canvasHeight', 200);
    // }
  }

  drawCompleteInterv() {
    //console.log(this.signatures.first.toDataURL().split(",")[1]);
  }

  drawCompleteClient() {
    //console.log(this.signatures.last.toDataURL().split(",")[1]);
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    //console.log('begin drawing');
  }

  //////////////////////// BOUTONS ///////////////////////////////

  onSaveClick(): void {
    this.intervention.signInterTemp = this.signatures.first.toData();
    this.intervention.signClientTemp = this.signatures.last.toData();
    console.log(this.intervention);

    if (this.photos) {
      this.intervention.photosTemp = this.photos;
    }
    this.dialogRef.close({ intervention: this.intervention, code: 2 });
  }

  onEnvoyerClick(): void {
    if (!this.signatures.first.isEmpty()) {
      this.intervention.signinterv = this.signatures.first.toDataURL();
      this.intervention.signInterTemp = [];
    }    
    if (!this.signatures.last.isEmpty() && this.intervention.correspondant !== "") {
      this.intervention.signclient = this.signatures.last.toDataURL();
      this.intervention.signClientTemp = [];
    }
    if (this.photos) {
      // On enleve l'entête de l'image pour ne garder que le base64
      this.intervention.photos = [];
      this.photos.forEach(photo => {
        this.intervention.photos.push(photo);  
      });
    }
    this.intervention.photosTemp = [];
    this.dialogRef.close({ intervention: this.intervention, code: 1 });
  }
}
