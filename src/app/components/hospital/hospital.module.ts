import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HospitalRoutes } from './hospital.routing';

import { HospitalComponent } from './hospital.component';
import { HospitalAddComponent } from './hospital-add/hospital-add.component';
import { HospitalDetailComponent } from './hospital-detail/hospital-detail.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        HospitalRoutes
    ],
    declarations: [
        HospitalComponent,
        HospitalAddComponent,
        HospitalDetailComponent,
        HospitalListComponent
    ]
})
export class HospitalModule { }