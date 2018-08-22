import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from './Services/data.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private data: DataService,
        private router: Router
    ) { }

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
    }
}
