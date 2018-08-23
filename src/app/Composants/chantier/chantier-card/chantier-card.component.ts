import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Chantier } from '../../../Classes/Chantier';
import { InterventionService } from '../../../Services/intervention.service';
import { MapsService } from '../../../Services/maps.service';
import { DialogueCarteComponent } from '../../dialogues/dialogue-carte/dialogue-carte.component';
import { DialogueConfirmationComponent } from '../../dialogues/dialogue-confirmation/dialogue-confirmation.component';
import { DialogueErreurComponent } from '../../dialogues/dialogue-erreur/dialogue-erreur.component';

@Component({
    selector: 'app-chantier-card',
    templateUrl: './chantier-card.component.html',
    styleUrls: ['./chantier-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChantierCardComponent {

    @Input() chantier: Chantier;

    lien = '';
    actualWidth: number;

    @ViewChild('panel') public panel: ElementRef;

    constructor(
        private route: Router,
        public maps: MapsService,
        public interService: InterventionService,
        public dialog: MatDialog,
        public sanitizer: DomSanitizer
    ) {
        // Actual space available in navigator
        this.actualWidth = window.innerWidth;
    }

    onResize(event) {
        this.actualWidth = event.target.innerWidth;
    }

    getMapSrc() {
        this.maps.getTrajet(this.chantier).subscribe(adresse => {
            if (adresse) {
                this.lien = adresse;
            }
        });
    }

    voirCarte() {
        this.dialog.open(DialogueCarteComponent, {
            panelClass: 'blublu',
            width: "95vw",
            height: "95vh",
            maxWidth: "95vw",
            data: { chantier: this.chantier }
        });
    }

    demarrerIntervention() {
        if (this.interService.isInterventionEnCours()) {
            this.dialog.open(DialogueErreurComponent, {
                //width: '250px',
                data: { texte: 'Vous avez déjà une intervention en cours.' }
            });
        } else {
            let dialogRef = this.dialog.open(DialogueConfirmationComponent, {
                data: { texte: "Veuillez entrer la date d'appel pour démarrer l'intervention.", date: new Date() }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result && result.dateAppel) {
                    //Créé une nouvelle intervention d'un chantier
                    console.log(result.dateAppel);
                    this.interService.insertIntervention(this.chantier, result.dateAppel, result.typeinter);
                    this.route.navigate(['accueil/intervention']);
                }
            });
        }
    }

    scrollTo() {
        setTimeout(() => {
            this.panel.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }, 100);
    }
}
