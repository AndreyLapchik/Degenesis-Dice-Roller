import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Utilisateur } from '../../utilisateur';
import { Intervention } from '../../Intervention';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterventionService } from '../../Services/intervention.service';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  @Input()
  spinnerVisible = false;
  search = "";

  constructor(
    public _data: DataService,
    public interService: InterventionService
  ) { }

  ngOnInit() {
    
  }



}
