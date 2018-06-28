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
  public readonly LIENS_ACCUEIL = AppComponent.LIENS_ACCUEIL; //.filter(lien => lien.id != 3 && lien.id != 1 && lien.id != 9);



  @Input() 
  util: Utilisateur;

  @Output() navToggle = new EventEmitter<boolean>();
  navOpen() {
    this.navToggle.emit(true);
  }


  constructor(
    public _data: DataService,
    public interService: InterventionService
    ) { }

  ngOnInit() {
    this._data.getAuthenticatedUser().subscribe(user => {
      this.util = user;
    });
  }

  openCloseNavbar() {
    this._data.navbar = !this._data.navbar;
  }

}
