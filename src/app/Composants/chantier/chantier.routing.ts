import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChantierComponent } from './chantier.component';

const routes: Routes = [
  { path: "", component: ChantierComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class ChantierRoutes {}
