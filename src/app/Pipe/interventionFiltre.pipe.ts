import { Pipe, PipeTransform } from '@angular/core';

import { Intervention } from '../Intervention';

@Pipe({
  name: 'interventionFiltre',
  pure: false
})
export class InterventionFiltrePipe implements PipeTransform {

  transform(interventions: Intervention[], statut: string) {
    if (!interventions) {
      return [];
    }
    if (!statut) {
      return interventions.filter(intervention => (intervention.statut === '1' || intervention.statut === '2'));
    }
    return interventions.filter(intervention => intervention.statut === statut);
  }

}
