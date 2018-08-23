import { Component, ViewChild } from '@angular/core';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';

import { Chantier } from '../../Classes/Chantier';
import { ChantierService } from '../../Services/chantier.service';

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css', './chantier.component.scss']
})
export class ChantierComponent {

  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;

  spinnerVisible = false;
  search: string;
  chantiers: Chantier[];
  actualWidth: number;

  constructor(
    public chantierService: ChantierService
  ) {
    this.actualWidth = window.innerWidth;
    this.chantierService.chantiers.subscribe(
      (chantiers) => {
        this.chantiers = chantiers;
      });
  }

  onOutput(chantier: Chantier) {
    this.virtualScroll.scrollInto(chantier);
  }

  trackByName(index, chantier) {
    return chantier.nom;
  }

  clear() {
    this.search = '';
  }

  onResize(event) {
    this.actualWidth = event.target.innerWidth;
  }
}
