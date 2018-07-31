import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DataService } from '../../Services/data.service';
import { Utilisateur } from '../../utilisateur';
import { InterventionService } from '../../Services/intervention.service';


@Component({
  selector: 'app-accueil-menu',
  templateUrl: './accueil-menu.component.html',
  styleUrls: ['./accueil-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccueilMenuComponent implements OnInit {
  @Input() nbInter: number;

  @Input() util: Utilisateur;

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
