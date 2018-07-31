import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class Configuration {
  public protocole;
  public server;
  public port;
  public apiUrl; //'api/';
  public dossierUrl;
  
  get getServerWithApiUrl(): string {
    return this.protocole + this.server + ':' + this.port + this.apiUrl + this.dossierUrl;
  }
}

@Injectable()
export class HttpService {

  private readonly LOG = "Login/1";
  private readonly CHANTIER = "getChantier/";
  private readonly INTERVENTION = "getIntervention/";
  private readonly PUSH = "Intervention/1";
  private readonly PHOTO = "Photo/1";

  actionUrl: string;

  get LOGIN() {
    return this.actionUrl + this.LOG;
  }

  get GET_INTERVENTION() {
    return this.actionUrl + this.INTERVENTION;
  }

  get GET_CHANTIER() {
    return this.actionUrl + this.CHANTIER;
  }

  get PUSH_INTERVENTION() {
    return this.actionUrl + this.PUSH;
  }

  get PUSH_PHOTO() {
    return this.actionUrl + this.PHOTO;
  }



}
