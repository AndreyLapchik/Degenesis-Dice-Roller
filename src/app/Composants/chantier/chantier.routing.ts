import { Routes, RouterModule } from '@angular/router';
import { ChantierComponent } from './chantier.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: "", component: ChantierComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ChantierRoutes {}
