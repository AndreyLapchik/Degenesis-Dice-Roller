import { Component, OnInit } from '@angular/core';

import { InterventionService } from '../../Services/intervention.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(
    public interService: InterventionService
  ) { }

  ngOnInit() {
    this.interService.pushInterventionsCompletes();
  }
}
