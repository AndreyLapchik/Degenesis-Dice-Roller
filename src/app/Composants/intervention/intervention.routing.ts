import { Routes, RouterModule } from '@angular/router';
import { InterventionComponent } from './intervention.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: "", component: InterventionComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class InterventionRoute {}
