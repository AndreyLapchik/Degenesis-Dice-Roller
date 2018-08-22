import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { InformationComponent } from './information.component';
import { InformationRoutes } from './information.routing';

@NgModule({
    imports: [
        InformationRoutes,
        SharedModule
    ],
    declarations: [InformationComponent]
})
export class InformationModule { }
