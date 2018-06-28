import { Component, Input } from '@angular/core';
import { Intervention } from '../../../Intervention';
import { MapsService } from '../../../Services/maps.service';
import { DialogueInterventionComponent } from '../../dialogues/dialogue-intervention/dialogue-intervention.component';
import { MatDialog } from '@angular/material';
import { InterventionService } from '../../../Services/intervention.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogueCarteComponent } from '../../dialogues/dialogue-carte/dialogue-carte.component';

@Component({
  selector: 'app-intervention-card',
  templateUrl: './intervention-card.component.html',
  styleUrls: ['./intervention-card.component.css']
})
export class InterventionCardComponent {
  @Input()
  intervention: Intervention;
  etatForm: boolean = false;
  lienAPI: string;
  // resultat: string;
  // obsresultat: string;
  // motif: string;
  // obsmotif: string;

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

  constructor(
    private _maps: MapsService,
    public dialog: MatDialog,
    public interService: InterventionService,
    public sanitizer: DomSanitizer
  ) { }

  ouvrirCarte() {
    this.dialog.open(DialogueCarteComponent, {
      panelClass: 'blublu',
      width: "95vw",
      height: "95vh",
      maxWidth: "95vw",
      data: { chantier: this.intervention }
    });
  }

  // L'utilisateur arrive sur le lieu de l'intervention
  public arrive() {
    this._maps.getLocation({ enableHighAccuracy: false, maximumAge: 60000, timeout: 27000 })
      .subscribe(position => {
        if (position && position != '') {
          this.intervention.datearrive = new Date().toISOString();
          console.log(this.intervention.datearrive);
          this.intervention.latdebpoint = position.coords.latitude;
          this.intervention.longdebpoint = position.coords.longitude;
          this.intervention.statut = '2';
          this.interService.pushInterventionToServer(this.intervention);
        }
      });
  }

  // L'utilisateur part du lieu de l'intervention
  public depart() {
    this._maps.getLocation({ enableHighAccuracy: false, maximumAge: 60000, timeout: 27000 })
      .subscribe(position => {
        if (position && position != '') {
          this.intervention.datedepart = new Date().toISOString();
          this.intervention.latfinpoint = position.coords.latitude;
          this.intervention.longfinpoint = position.coords.longitude;
          this.intervention.statut = '3';
          this.interService.pushInterventionToServer(this.intervention);
        }
      });
  }

  // L'utilisateur a remplit le formulaire en entier en l'envoie
  public Submit() {
    if (this.intervention.statut === '2') {
      this._maps.getLocation({ enableHighAccuracy: false, maximumAge: 60000, timeout: 27000 })
        .subscribe(position => {
          if (position && position != '') {
            this.intervention.datedepart = new Date().toISOString();
            this.intervention.latfinpoint = position.coords.latitude;
            this.intervention.longfinpoint = position.coords.longitude;
            this.intervention.statut = '4';
            this.interService.pushInterventionToServer(this.intervention);
          }
        });
    } else {
      this.intervention.statut = '4';
      this.interService.pushInterventionToServer(this.intervention);
    }
  }

  public ouvrirFormulaire() {
    //this.etatForm = !this.etatForm;
    let dialogRef = this.dialog.open(DialogueInterventionComponent, {
      panelClass: 'blublu',
      maxWidth: "95vw",
      maxHeight: "95vh",

      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true,
      data: { intervention: this.intervention }
    });
    // Le dialogue est fermé, on récupère le résultat
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.intervention = result.intervention;
        console.log("Recu : ");
        console.log(this.intervention);

        // Le formulaire est complet, on l'envoie :
        // succès : on le supprime de la mémoire locale
        // echec : on le garde jusqu'a ce qu'il puisse être envoyé
        if (result.code == '1') {
          this.Submit();
        }
        // Le formulaire n'est pas encore complet, on le garde en local
        if (result.code == '2') {
          this.interService.pushInterventionToServer(this.intervention);
        }
      }
    });
  }



}
