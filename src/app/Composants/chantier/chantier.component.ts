import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

import { Chantier } from '../../Chantier';
import { DataService } from '../../Services/data.service';

import { ChantierService } from '../../Services/chantier.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css', './chantier.component.scss']
})
export class ChantierComponent implements OnInit {
  @Input()
  spinnerVisible = false;
  search: string;
  @Input() chantiers: Chantier[];

constructor(
    public _data: DataService,
    public chantierService: ChantierService
  ) { }

  ngOnInit() {
    this.spinnerVisible = true;
    this.chantierService.chantiers.subscribe((chantiers) => {
      if (chantiers && chantiers.length > 0 ) {
        this.chantiers = chantiers;
        this.spinnerVisible = false;
      }
    });
  }

  clear() {
    this.search = '';
  }
}
