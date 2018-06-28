import { Injectable } from '@angular/core';

import { AngularIndexedDB } from 'angular2-indexeddb';

import { Utilisateur } from '../utilisateur';

@Injectable()
export class IndexedDBService {
  public static readonly CONNEXION: string = 'connexion';
  public static readonly DB_NAMETB_MISS: string = 'missions';
  public static readonly DB_NAMETB_CHECK: string = 'checks';

  public static readonly DB_NAME: string = 'DAT-SECURITY';
  public static readonly DB_VERSION: number = 1;

  public static execEnCours = false;

  public database: AngularIndexedDB;

  get getBdd(): AngularIndexedDB {
    return this.database;
  }

  constructor(
  ) { }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  // local storage
  manage(util: Utilisateur) {
    let sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (sessionUser && sessionUser.nom != '') {
      util.infosOk = true;
      util.nom = sessionUser.nom;
    }
  }

  // getAngularDbConn(nom?: string, version?: number): AngularIndexedDB {
  //   if (nom && version) {
  //     return new AngularIndexedDB(nom, version);
  //   } else {
  //     return new AngularIndexedDB(IndexedDBService.DB_NAME, IndexedDBService.DB_VERSION);
  //   }
  // }

  // getAngularDb(nom?: string, version?: number): Promise<any> {
  //   if (!version) {
  //     version = IndexedDBService.DB_VERSION;
  //   }
  //   return this.getAngularDbConn(nom, version).openDatabase(version);
  // }

  // openDatabaseAngular(bdd: AngularIndexedDB, version?: number): Promise<any> {
  //   if (!version) {
  //     version = IndexedDBService.DB_VERSION;
  //   }
  //   return bdd.openDatabase(version);
  // }

  // createConnAngular(nom?: string, version?: number): Promise<any> {
  //   if (!nom || !version) {
  //     nom = IndexedDBService.DB_NAME;
  //     version = IndexedDBService.DB_VERSION;
  //   }

  //   this.database = this.getAngularDbConn(nom, version);

  //   return this.database.openDatabase(version);
  // }

  createBdd(): Promise<any> {
    this.database = new AngularIndexedDB(IndexedDBService.DB_NAME, IndexedDBService.DB_VERSION);

    return this.database.openDatabase(IndexedDBService.DB_VERSION, (evt) => {
      // -- Création des tables et des index

      let objectStore = evt.currentTarget.result.createObjectStore(
        "intervention", { keyPath: 'id', autoIncrement: true }
      );
      objectStore.createIndex('statut', 'statut', { unique: false });
    });
  }

  ajouteElem(tableAj: string, valAj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.database.add(tableAj, valAj)
        .then(
          fin => {
            console.log("ok aj " + fin);

            resolve(fin);
          },
          err => {
            console.log("err aj " + err);

            reject(err);
          }
        );
    });
  }

  ajouteElements(tableAj: string, valeursAj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let isExiste = false;

      for (let elem of valeursAj) {
        this.database.getByIndex(tableAj, 'idc, datemis', [elem.idc, elem.datemis]).then((val) => {
          isExiste = (val && val.id);
          if (!isExiste) {
            return this.ajouteElem(tableAj, elem);
          } else {
            return new Promise((resolve, reject) => { resolve('existe'); });
          }
        }, (err) => {
          reject('ajouteElements getElem ERR' + err);
        }).then((succ) => { // Success
          // console.log(`succs ajouteElemm mission id: ${elem.id}`);
          if (succ && succ === 'existe') {
            resolve('ajouteElem existe');
          } else {
            resolve('ajouteElem Ok' + succ);
          }
        },
          (msg) => { // Error
            reject('ajouteElem ERR' + msg);
          }
        );
      }
    });
  }

  existeElem(tableAj: string, valId: string): boolean {
    if (!valId) {
      return false;
    }

    let isExiste = false;

    // test si élément existe
    this.database.getByKey(tableAj, valId).then((elem) => {
      if (elem && elem.id) {  // élément existe
        isExiste = true;
      } else {
        isExiste = false;
      }

      return isExiste;
    }, (err) => {
      console.log('existeElem err');
    });
  }

  supprElem(tableAj: string, valId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.database.delete(tableAj, valId)
        .then(
          fin => { resolve(fin); },
          err => { reject(err); }
        );
    });
  }
}
