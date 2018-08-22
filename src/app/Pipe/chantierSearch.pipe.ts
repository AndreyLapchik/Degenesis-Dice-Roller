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
      (this.myLowerCase(chantier.nom).includes(mot.toLowerCase())  ||
      this.myLowerCase(chantier.ville).includes(mot.toLowerCase()) ||
      this.myLowerCase(chantier.cp).includes(mot.toLowerCase()) ));
  }

  // Returns "" if mot is empty else LowerCase
  myLowerCase(mot: string): string {
    return mot ? mot.toLowerCase() : "";
  }

}
