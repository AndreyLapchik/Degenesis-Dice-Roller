import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../../Services/data.service';
import { InterventionService } from '../../../Services/intervention.service';
import { Utilisateur } from '../../../utilisateur';

@Component({
  selector: 'app-accueil-menu',
  templateUrl: './accueil-menu.component.html',
  styleUrls: ['./accueil-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AccueilMenuComponent implements OnInit {

  @Input() nbInter: number;

  util: Utilisateur;

  constructor(
    public _data: DataService,
    public interService: InterventionService
  ) { }

  ngOnInit() {
    this._data.getAuthenticatedUser().subscribe(user => {
      this.util = user;
    });
  }
}
