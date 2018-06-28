import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs';


import { DataService } from './Services/data.service';
import { Utilisateur } from './utilisateur';
import { InterventionService } from './Services/intervention.service';
import { Chantier } from './Chantier';
import { ChantierService } from './Services/chantier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  public static authOk = false;
  title = 'DAT Intervention';

  @Input()
  utilisateur: Utilisateur;

  ngOnInit(): void {
    this.chantierService.getChantiers();
    this.interService.getLocalInterventions();
  }

  constructor(
    protected data: DataService,
    public interService: InterventionService,
    public chantierService: ChantierService
  ) { }

  ngAfterViewInit() {
    this.interService.pushInterventionsCompletes();
    //évènement qui surveille la remise en ligne de l'application
    let online$ = fromEvent(window, 'online')
      .subscribe(e => {
        this.interService.pushInterventionsCompletes();
      });

    //évènement qui surveille le passage hors-ligne de l'application
    let offline$ = fromEvent(window, 'offline')
      .subscribe(e => {

      });
  }

  // tslint:disable-next-line:member-ordering
  public static readonly LIENS_ACCUEIL: any[] = [
    { id: 1, texte: 'LISTE DES CHANTIERS', logo: 'work', lien: '/accueil/chantier' },
    { id: 2, texte: 'MES INTERVENTIONS', logo: 'assignment_returned', lien: '/accueil/intervention' },
    { id: 3, texte: 'MES INFORMATIONS', logo: 'person', lien: '/accueil/information' }
  ];

}
