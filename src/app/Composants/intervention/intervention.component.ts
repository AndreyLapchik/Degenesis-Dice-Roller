import { Component, Input } from '@angular/core';

import { DataService } from '../../Services/data.service';
import { InterventionService } from '../../Services/intervention.service';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent {
  @Input()
  spinnerVisible = false;
  search = "";

  constructor(
    public _data: DataService,
    public interService: InterventionService
  ) { }

  envoiInter() {
    this.interService.pushInterventionsCompletes();
  }
}
