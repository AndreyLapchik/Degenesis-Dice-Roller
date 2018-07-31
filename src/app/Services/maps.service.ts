import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
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

  constructor() { }

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
                console.log(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                break;
              case 2:
                console.log(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                break;
              case 3:
                console.log(GEOLOCATION_ERRORS['errors.location.timeout']);
                break;
            }
          },
          opts);
      } else {
        console.log(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }
    });
  }

  getTrajet(lieu: any): Observable<string> {
    //[lieu.adr1, lieu.adr2, lieu.adr3,  lieu.cp,  lieu.ville, lieu.pays].join(' ');
    let adresse: string =  
      ((lieu.adr1) ? lieu.adr1 : "" ) + 
      ((lieu.adr2) ? "+" + lieu.adr2 : "" ) + 
      ((lieu.adr3) ? "+" + lieu.adr3 : "" ) + 
      ((lieu.cp) ? ",+" + lieu.cp : "" ) + 
      ((lieu.ville) ? "+" + lieu.ville : "" ) + 
      ((lieu.pays) ? ",+" + lieu.pays : "") ;
    adresse = adresse.replace(/ /g, "+");
    //console.log(adresse);
    return Observable.create(observer => {
      this.getLocation({ enableHighAccuracy: false, maximumAge: 60000, timeout: 27000 })
      .subscribe(position => {
        if (position && position != '') {
          let coord = position.coords.latitude + "," +  position.coords.longitude; 
          observer.next(this.ROOT + this.ORIGIN + coord + this.DESTINATION + adresse + this.KEY);
          observer.complete();
        }
      });
    });
  }
}
