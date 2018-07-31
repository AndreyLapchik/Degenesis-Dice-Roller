import { Component, OnInit, Inject, ViewChildren, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Intervention } from '../../../Intervention';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { IndexedDBService } from '../../../Services/indexedDB.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialogue-intervention',
  templateUrl: './dialogue-intervention.component.html',
  styleUrls: ['./dialogue-intervention.component.css']
})


export class DialogueInterventionComponent implements AfterViewInit {

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

  form: FormGroup;

  spinnerVisible: Boolean = false;
  traitementEnCours: Boolean = false;

  constructor(
    public indexedDB: IndexedDBService,
    public dialogRef: MatDialogRef<DialogueInterventionComponent>,
    public sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.intervention = data.intervention;
    console.log("Envoyé : ");
    console.log(this.intervention);
    // Recuperation des photos dans indexeddb
    this.indexedDB.getInterPhotos(this.intervention, 0).then(photos => {
      photos.forEach(photo => {
        this.photos.push(photo.photo);
      });
    }, (err) => {
      console.log(err);
    });

    const controls = this.resultats.map(c => new FormControl(false));
    // On initialise les checkboxs
    if (this.intervention.resultat) {
      let resTab = this.intervention.resultat.split(';');
      resTab.forEach(res => {
        // '+' permet de transformer une chaine en entier, -1 pour l'index
        controls[+res - 1].setValue(true);
      });
    }
    this.form = this.formBuilder.group({
      resultats: new FormArray(controls, this.minSelectedCheckboxes(1))
    });
  }

  // Pour éviter l'erreur :  Property 'controls' does not exist on type 'AbstractControl'.
  get formData() { return <FormArray>this.form.controls.resultats; }

  // On met les valeurs des checkbox dans un tableaux qu'on join avec le char ';'
  submitResultats() {
    const selectedResultatsValue = this.form.value.resultats
      .map((v, i) => v ? this.resultats[i].value : null)
      .filter(v => v !== null);

    this.intervention.resultat = selectedResultatsValue.join(';');
    // Si la case 'Autres' n'est pas cochée, on efface obsResultat
    if (!this.intervention.resultat.includes('9')) {
      this.intervention.obsresultat = '';
    }
  }

  // Au moins une checkbox séléctionnée
  public minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  public ngAfterViewInit() {
    this.signatures.first.set('canvasWidth', 200);
    this.signatures.first.set('canvasHeight', 200);


    this.signatures.last.set('canvasWidth', 200);
    this.signatures.last.set('canvasHeight', 200);

    // Delai pour éviter une erreur
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

  changeListener(event): void {
    this.spinnerVisible = true;
    this.traitementEnCours = true;
    let file = event.target.files[0];
    if (file && file.type.includes("image")) {
      this.resizeImage(file, 720, 720).then(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.indexedDB.addPhoto(reader.result, this.intervention).then(() => {
            this.traitementEnCours = false;
          });
        };
        let photoBlob = URL.createObjectURL(blob);
        this.photos.push(photoBlob);
      });
    }
  }

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width <= maxWidth && height <= maxHeight) {
          resolve(file);
        }

        let newWidth;
        let newHeight;

        if (width > height) {
          newHeight = height * (maxWidth / width);
          newWidth = maxWidth;
        } else {
          newWidth = width * (maxHeight / height);
          newHeight = maxHeight;
        }

        let canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        let context = canvas.getContext('2d');

        context.drawImage(image, 0, 0, newWidth, newHeight);

        canvas.toBlob(resolve, file.type);
      };
      image.onerror = reject;
    });
  }
  
  //////////////////////// SIGNATURE ///////////////////////////////

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
    // Pour pouvoir afficher les signatures ulterieurement,
    // il faut les sauvegarder sous forme de tableaux de points
    // car la fonction fromDataUrl() ne marche pas correctement.
    this.intervention.signInterTemp = this.signatures.first.toData();
    this.intervention.signClientTemp = this.signatures.last.toData();
    console.log(this.intervention);

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
    this.dialogRef.close({ intervention: this.intervention, code: 1 });
  }

  //////////////////////// VALIDATION FORMULAIRE ///////////////////////////////

  get isResultatValide(): boolean {
    return (
      (this.formData.valid && !this.intervention.resultat.includes('9')) ||
      (this.formData.valid && this.intervention.resultat.includes('9') && Boolean(this.intervention.obsresultat))
    );
  }
}
