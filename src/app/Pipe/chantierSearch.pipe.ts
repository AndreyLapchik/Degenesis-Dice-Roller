import { Pipe, PipeTransform } from '@angular/core';
import { Chantier } from '../Chantier';

@Pipe({
  name: 'chantierSearch'
})
export class ChantierSearchPipe implements PipeTransform {

  transform(chantiers: Chantier[], mot: string) {
    if (!chantiers) {
      return [];
    }
    if (!mot) {
      return chantiers;
    }
    return chantiers.filter(chantier => 
      (chantier.nom.toLowerCase().includes(mot.toLowerCase())  || 
      chantier.ville.toLowerCase().includes(mot.toLowerCase()) || 
      chantier.cp.toLowerCase().includes(mot.toLowerCase()) ));
  }

}
