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
        private route: ActivatedRoute) {}

    canActivate(): Observable<boolean> {
        return Observable.create(observer => {
            this.data.login().subscribe(res => {
                if (!res) {
                    console.log('AuthGuard => connexion');
                    observer.next(false);
                    this.router.navigate(['/connexion']);                    
                } else {
                    observer.next(true);
                }

            });
        });  
    }

                // this.data.getAuthenticatedUser().subscribe((user) => {
            //     if (user.isAnonymous) {
            //         console.log('Redirection AuthGuard');
            //         this.router.navigate(['/connexion']);                    
            //         observer.next(false);
            //     } else {
            //         observer.next(true);                    
            //     }                
            // });
}
