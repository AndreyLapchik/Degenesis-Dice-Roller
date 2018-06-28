import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class Configuration {
  public Protocole = 'https://';
  //public Server = '10.0.26.77';
  public Server = 'localhost';
  public Port = '444/';
  public ApiUrl = 'datasnap/rest/'; //'api/';
  public dossierUrl = 'TServerMethods1/';
  public ServerWithApiUrl = this.getServerWithApiUrl;
  public ForceConfig = true;

  get getServerWithApiUrl(): string {
    return this.Protocole + this.Server + ':' + this.Port + this.ApiUrl + this.dossierUrl;
  }
}

@Injectable()
export class HttpService {

  private readonly LOG = "Login/1";
  private readonly CHANTIER = "getChantier/";
  private readonly INTERVENTION = "getIntervention/";
  private readonly PUSH = "Intervention/1";

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

  constructor(
    private _configuration: Configuration,
  ) {
    if (!_configuration.ForceConfig) {
      const serverHost = window.location.hostname;

      if (serverHost.length > 0) {
        _configuration.Server = serverHost;
      }
    }
    this.actionUrl = _configuration.getServerWithApiUrl;
  }

}
