import { Pipe, PipeTransform } from '@angular/core';
import { Intervention } from '../Intervention';

@Pipe({
  name: 'interventionSearch'
})
export class InterventionSearchPipe implements PipeTransform {

  transform(interventions: Intervention[], mot: string) {
    if (!interventions) {
      return [];
    }
    if (!mot) {
      return interventions;
    }
    return interventions.filter(intervention => 
      (intervention.nom.toLowerCase().includes(mot.toLowerCase())  || 
      intervention.ville.toLowerCase().includes(mot.toLowerCase()) || 
      intervention.cp.toLowerCase().includes(mot.toLowerCase()) ));
  }
}
