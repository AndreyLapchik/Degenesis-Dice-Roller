import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';

import { Intervention } from '../Classes/Intervention';

@Injectable()
export class IndexedDBService {

  public DB_NAME: string = 'DAT-SECURITY';
  public DB_VERSION: number = 1;

  public database: AngularIndexedDB;

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
}
