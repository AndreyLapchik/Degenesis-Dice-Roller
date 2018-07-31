import { Injectable } from '@angular/core';

import { AngularIndexedDB } from 'angular2-indexeddb';

import { Utilisateur } from '../utilisateur';
import { Intervention } from '../Intervention';

@Injectable()
export class IndexedDBService {
  public CONNEXION: string = 'connexion';

  public DB_NAME: string = 'DAT-SECURITY';
  public DB_VERSION: number = 1;

  public execEnCours = false;

  public database: AngularIndexedDB;

  get getBdd(): AngularIndexedDB {
    return this.database;
  }

  constructor(
  ) { }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

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
    this.database = new AngularIndexedDB(this.DB_NAME, this.DB_VERSION);

    return this.database.openDatabase(this.DB_VERSION, (evt) => {
      // -- Création des tables et des index

      let objectStore = evt.currentTarget.result.createObjectStore(
        "Photos", { keyPath: 'id', autoIncrement: true }
      );
      objectStore.createIndex('inter', ['idchantier', 'intervenant', 'typeinter', 'dateappel', 'valide'], { unique: false });
      objectStore.createIndex('valide', 'valide', { unique: false });
    });
  }

  addPhoto(photo: string, inter: Intervention): Promise<any> {
    return this.database.add('Photos',
      {
        'photo': photo,
        'idchantier': inter.idchantier,
        'intervenant': inter.intervenant,
        'typeinter': inter.typeinter,
        'dateappel': inter.dateappel,
        'nombd': inter.nombd,
        'valide': 0
      }).then(() => {
        //
      }, (err) => {
        console.log(err);
      });
  }

  validatePhotos(inter: Intervention): Promise<any> {
    console.log('validatePhotos');
    return new Promise((resolve, reject) => {
      return this.getInterPhotos(inter, 0).then(photos => {
        photos.forEach(photo => {
          this.database.update(
            'Photos',
            {
              id: photo.id, 
              photo: photo.photo,
              idchantier: photo.idchantier,
              intervenant: photo.intervenant,
              typeinter: photo.typeinter,
              dateappel: photo.dateappel,
              nombd: photo.nombd,
              valide: 1 
            }
          ).then(() => {
            resolve();
          }, (err) => {
            console.log(err);
            reject(err);
          });
        });
      });
    });
  }

  getInterPhotos(inter: Intervention, valide: number): Promise<any> {
    return this.database.getAll(
      'Photos',
      IDBKeyRange.only([inter.idchantier, inter.intervenant, inter.typeinter, inter.dateappel, valide]),
      { indexName: 'inter', order: '' }
    );
  }

  getPhotos(valide: number): Promise<any> {
    return this.database.getAll(
      'Photos',
      IDBKeyRange.only(valide),
      { indexName: 'valide', order: '' }
    );
  }

  // ajouteElem(tableAj: string, valAj: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     return this.database.add(tableAj, valAj)
  //       .then(
  //         fin => {
  //           console.log("ok aj " + fin);

  //           resolve(fin);
  //         },
  //         err => {
  //           console.log("err aj " + err);

  //           reject(err);
  //         }
  //       );
  //   });
  // }

  // ajouteElements(tableAj: string, valeursAj: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     let isExiste = false;

  //     for (let elem of valeursAj) {
  //       this.database.getByIndex(tableAj, 'idc, datemis', [elem.idc, elem.datemis]).then((val) => {
  //         isExiste = (val && val.id);
  //         if (!isExiste) {
  //           return this.ajouteElem(tableAj, elem);
  //         } else {
  //           return new Promise((resolve, reject) => { resolve('existe'); });
  //         }
  //       }, (err) => {
  //         reject('ajouteElements getElem ERR' + err);
  //       }).then((succ) => { // Success
  //         // console.log(`succs ajouteElemm mission id: ${elem.id}`);
  //         if (succ && succ === 'existe') {
  //           resolve('ajouteElem existe');
  //         } else {
  //           resolve('ajouteElem Ok' + succ);
  //         }
  //       },
  //         (msg) => { // Error
  //           reject('ajouteElem ERR' + msg);
  //         }
  //       );
  //     }
  //   });
  // }

  // existeElem(tableAj: string, valId: string): boolean {
  //   if (!valId) {
  //     return false;
  //   }

  //   let isExiste = false;

  //   // test si élément existe
  //   this.database.getByKey(tableAj, valId).then((elem) => {
  //     if (elem && elem.id) {  // élément existe
  //       isExiste = true;
  //     } else {
  //       isExiste = false;
  //     }

  //     return isExiste;
  //   }, (err) => {
  //     console.log('existeElem err');
  //   });
  // }

  // supprElem(tableAj: string, valId: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     return this.database.delete(tableAj, valId)
  //       .then(
  //         fin => { resolve(fin); },
  //         err => { reject(err); }
  //       );
  //   });
  // }
}
