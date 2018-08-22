import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Les services GPS ne sont pas supportés par votre navigateur.',
  'errors.location.permissionDenied': "Vous avez refusé l'accès à vos coordonnées GPS.",
  'errors.location.positionUnavailable': 'Impossible de déterminer votre position.',
  'errors.location.timeout': "Vos coordonnées GPS n'ont pu être récupérées dans le temps imparti."
};

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private readonly ROOT = "https://www.google.com/maps/embed/v1/directions?";

  private readonly KEY = "&key=AIzaSyD9miiz6awcmd55cpmnqfVoDdkBUwQRtS4";

  private readonly ORIGIN = "origin=";

  private readonly DESTINATION = "&destination=";

  private readonly FULLSCREEN = " allowfullscreen";

  constructor(
    public snackBar: MatSnackBar
  ) { }

  get Key(): string {
    return this.KEY;
  }

  getLocation(opts): Observable<any> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
            //console.log(`ok getLocation = latitude : ${position.coords.latitude} et longitude : ${position.coords.longitude}`);
          },
          (error) => {
            switch (error.code) {
              case 1:
                this.snackBar.open(GEOLOCATION_ERRORS['errors.location.permissionDenied'], "", {
                  duration: 3000,
                });
                observer.error(1);
                break;
              case 2:
                this.snackBar.open(GEOLOCATION_ERRORS['errors.location.positionUnavailable'], "", {
                  duration: 3000,
                });
                observer.error(2);
                break;
              case 3:
                this.snackBar.open(GEOLOCATION_ERRORS['errors.location.timeout'], "", {
                  duration: 3000,
                });
                observer.error(3);
                break;
            }
          },
          opts);
      } else {
        this.snackBar.open(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser'], "", {
          duration: 3000,
        });
        observer.error(4);
      }
    });
  }

  getTrajet(lieu: any): Observable<string> {
    let adresse: string =
      ((lieu.adr1) ? lieu.adr1 : "") +
      ((lieu.adr2) ? "+" + lieu.adr2 : "") +
      ((lieu.adr3) ? "+" + lieu.adr3 : "") +
      ((lieu.cp) ? ",+" + lieu.cp : "") +
      ((lieu.ville) ? "+" + lieu.ville : "") +
      ((lieu.pays) ? ",+" + lieu.pays : "");
    adresse = adresse.replace(/ /g, "+");
    return Observable.create(observer => {
      this.getLocation({ enableHighAccuracy: true, maximumAge: 0, timeout: 10000 })
        .subscribe(position => {
          if (position && position != '') {
            let coord = position.coords.latitude + "," + position.coords.longitude;
            observer.next(this.ROOT + this.ORIGIN + coord + this.DESTINATION + adresse + this.KEY);
            observer.complete();
          }
        }, error => {
          console.log("code erreur GPS :" + error.toString());
        });
    });
  }
}
