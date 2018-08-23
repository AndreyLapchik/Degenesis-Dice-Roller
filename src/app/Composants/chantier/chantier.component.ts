import { Component, OnInit } from '@angular/core';

import { Chantier } from '../../Classes/Chantier';
import { ChantierService } from '../../Services/chantier.service';

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css', './chantier.component.scss']
})
export class ChantierComponent implements OnInit {

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

  ngOnInit() {

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
