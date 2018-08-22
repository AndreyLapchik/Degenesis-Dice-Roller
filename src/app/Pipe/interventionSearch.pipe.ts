import { Pipe, PipeTransform } from '@angular/core';

import { Intervention } from '../Classes/Intervention';

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
      (this.myLowerCase(intervention.nom).includes(mot.toLowerCase())  ||
      this.myLowerCase(intervention.ville).includes(mot.toLowerCase()) ||
      this.myLowerCase(intervention.cp).includes(mot.toLowerCase()) ));
  }

  // Returns "" if mot is empty else LowerCase
  myLowerCase(mot: string): string {
    return mot ? mot.toLowerCase() : "";
  }
}
