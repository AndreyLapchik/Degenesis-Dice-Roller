import { Component } from '@angular/core';

export class Resultat {
  valeurAction: number = 1;
  nbDeclencheurs: number = 0;
  nbSucces: number = 0;
  nbSuccesComp: number = 0;
  nbSuccesAttr: number = 0;
  nbUn: number = 0;
  echecCritique: boolean = false;
  effet: string;
  effetEn: string;
  color: string;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  rolled: boolean = false;
  gameMode: boolean = false;

  vanillaDices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  resultDices: any[];

  ImmersionDices = [1, 2, 3, 4, 5, 6];

  resultAttrDices: any[];
  resultCompDices: any[];
  
  resultats: Resultat[] = [];

  qualites: string[] = ["Echec critique", "Bien", "Remarquable", "Excellent", "Brillant", "Exceptionnel", "Légendaire"];
  qualitesEn: string[] = ["Fumble", "Solid", "Remarkable", "Excellent", "Brilliant", "Incredible", "Legendary"];
  colors: string[] = ["black", "limegreen", "blue", "purple", "orange", "red"];

  constructor() {}

  roll(n: number, attr: number, comp: number) {
    if (this.gameMode) {
      this.rollImmersion(attr, comp);
    } else {
      this.rollVanilla(n);
    }
  } 

  rollVanilla(n: number) {
    this.rolled = true;
    this.resultDices = [];
    let res = new Resultat;
    res.valeurAction = +n;

    // Genereates n D6 number and fills the rest with zeros
    this.resultDices = this.generateD6Array(n, 12);    
    res.nbDeclencheurs = this.resultDices.reduce((ac: number, x: number): number =>  x == 6 ? ac + 1 : ac, 0);
    res.nbSucces = this.resultDices.reduce((ac: number, x: number): number =>  x > 3 ? ac + 1 : ac, 0);
    res.nbUn = this.resultDices.reduce((ac: number, x: number): number =>  x == 1 ? ac + 1 : ac, 0); 
    
    // Fills the rest of the dices with zeros to keep proportions

    res.echecCritique = (res.nbUn > res.nbSucces);
    if (res.echecCritique) {
      res.effet = this.qualites[0];
      res.effetEn = this.qualitesEn[0];
    } else if (res.nbDeclencheurs > 0 && res.nbDeclencheurs <= 6) {
      res.effet = this.qualites[res.nbDeclencheurs].toUpperCase();
      res.effetEn = this.qualitesEn[res.nbDeclencheurs].toUpperCase();
      res.color = this.colors[res.nbDeclencheurs - 1];
    } else if (res.nbDeclencheurs > 6) {
      res.effet = this.qualites[6].toUpperCase();
      res.effetEn = this.qualitesEn[6].toUpperCase();
      res.color = this.colors[6];
    }
    this.resultats.push(res);
  }

  rollImmersion(attr: number, comp: number) {
    this.rolled = true;
    let res = new Resultat;

    this.resultAttrDices = this.generateD6Array(attr, 6);
    this.resultCompDices = this.generateD6Array(comp, 6);
    
    res.valeurAction = +attr + +comp;
    
    res.nbSuccesAttr = this.resultAttrDices.reduce((ac: number, x: number): number =>  x > 3 ? ac + 1 : ac, 0);
    res.nbSuccesComp = this.resultCompDices.reduce((ac: number, x: number): number =>  x > 3 ? ac + 1 : ac, 0);
    res.nbSucces = res.nbSuccesAttr + res.nbSuccesComp;

    res.nbDeclencheurs = this.resultAttrDices.concat(this.resultCompDices).reduce(
      (ac: number, x: number): number =>  x == 6 ? ac + 1 : ac, 0);

    res.nbUn = this.resultAttrDices.concat(this.resultCompDices).reduce(
      (ac: number, x: number): number =>  x == 1 ? ac + 1 : ac, 0);
   
    
    // console.log(res);
    res.echecCritique = (res.nbUn > res.nbSucces);
    if (res.echecCritique) {
      res.effet = this.qualites[0];
      res.effetEn = this.qualitesEn[0];
    } else if (res.nbDeclencheurs > 0 && res.nbDeclencheurs <= 6) {
      res.effet = this.qualites[res.nbDeclencheurs].toUpperCase();
      res.effetEn = this.qualitesEn[res.nbDeclencheurs].toUpperCase();
      res.color = this.colors[res.nbDeclencheurs - 1];
    } else if (res.nbDeclencheurs > 6) {
      res.effet = this.qualites[6].toUpperCase();
      res.effetEn = this.qualitesEn[6].toUpperCase();
      res.color = this.colors[6];
    }
    this.resultats.push(res);
  }

  reset() {
    this.rolled = false;
  }

  clear() {
    this.resultats = [];
  }

  // Genereates n D6 number and fills the rest with zeros
  generateD6Array(n: number, fill: number): any[] {
    let result = [];
    for (let i = 0; i < fill; i++) {
      if (i < n ) {
        let diceResult = Math.floor(Math.random() * 6) + 1;
        result.push(diceResult); 
      } else {
        result.push(" ");
      }           
    }
    return result;
  }

  changeMode() {
    this.gameMode = !this.gameMode;
    this.clear();
    this.reset();
  }

  infos() {
    
  }
  
}
