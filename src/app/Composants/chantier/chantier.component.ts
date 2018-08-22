import { Component, OnInit } from '@angular/core';

import { Chantier } from '../../Chantier';
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

  constructor(
    public chantierService: ChantierService
  ) { }

  ngOnInit() {
    this.spinnerVisible = true;
    this.chantierService.chantiers.subscribe((chantiers) => {
      if (chantiers && chantiers.length > 0) {
        this.chantiers = chantiers;
        this.spinnerVisible = false;
      }
    });
  }

  clear() {
    this.search = '';
  }
}
