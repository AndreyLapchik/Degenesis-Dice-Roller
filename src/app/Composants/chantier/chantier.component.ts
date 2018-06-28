import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Chantier } from '../../Chantier';
import { DataService } from '../../Services/data.service';

import { ChantierService } from '../../Services/chantier.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChantierComponent implements OnInit {
  @Input()
  spinnerVisible = false;
  search: string;
  chantiers: Observable<Chantier[]>;

  constructor(
    public _data: DataService,
    public chantierService: ChantierService
  ) { }

  ngOnInit() {
    this.chantiers = this.chantierService.chantiers;

  }

  clear() {
    this.search = '';
  }
}
