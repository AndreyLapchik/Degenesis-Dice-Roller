import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
// tslint:disable-next-line:import-blacklist
import { Observable } from "rxjs";
import { DataService } from "./Services/data.service";
import { AppComponent } from "./app.component";
import { Utilisateur } from "./utilisateur";

@Injectable()
export class NoAuthGuard implements CanActivate {

    constructor(
        private data: DataService,
        private router: Router) { }

    canActivate(): Observable<boolean> {
        return Observable.create(observer => {
            this.data.login().subscribe(res => {
                if (res.result) {
                    console.log('NoAuthGuard => accueil');
                    observer.next(false);
                    this.router.navigate(['/accueil']);
                } else {
                    console.log('NoAuthGuard => ok');
                    observer.next(true);
                }

            });
        });
    }
}
