import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRoute } from "@angular/router";
// tslint:disable-next-line:import-blacklist
import { Observable } from "rxjs";
import { DataService } from "./Services/data.service";
import { AppComponent } from "./app.component";
import { Utilisateur } from "./utilisateur";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private data: DataService,
        private router: Router,
        private route: ActivatedRoute) { }

    canActivate(): Observable<boolean> {
        return Observable.create(observer => {
            this.data.login().subscribe(res => {
                if (!res.result) {
                    console.log('AuthGuard => connexion');
                    observer.next(false);
                    this.router.navigate(['/connexion']);                    
                } else {
                    observer.next(true);
                }

            });
        });

        // return Observable.create(observer => {
        //     this.data.login().subscribe(res => {
        //         if (!res.result) {
        //             console.log('AuthGuard => connexion');
        //             observer.next(false);
        //             this.router.navigate(['/connexion']);
        //         } else {
        //             this.data.getAuthenticatedUser().subscribe(util => {
        //                 if (util && Utilisateur.rempli(util)) {
        //                     observer.next(true);
        //                 } else {
        //                     console.log('AuthGuard => connexion');
        //                     observer.next(false);
        //                     this.router.navigate(['/connexion']);
        //                 }
        //             });
        //         }
        //     });

        // });
    }
}
