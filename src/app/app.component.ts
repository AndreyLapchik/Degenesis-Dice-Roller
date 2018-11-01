import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public swUpdate: SwUpdate,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      console.log("service workers enabled");
      // interval(20000).subscribe(() =>
      this.swUpdate.checkForUpdate();
      this.swUpdate.available.subscribe(event => {
        this.snackbar.open('Mise à jour disponible', 'Recharger', { duration: 6000 })
          .onAction().subscribe(() => {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
          });
      });
    }
  }
}
