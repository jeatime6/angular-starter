import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { HospitalRoutes } from './hospital.routing';

import { HospitalComponent } from './hospital.component';
import { HospitalAddComponent } from './hospital-add/hospital-add.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalUpdateComponent } from './hospital-update/hospital-update.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgbModule.forRoot(),
        HospitalRoutes
    ],
    declarations: [
        HospitalComponent,
        HospitalAddComponent,
        HospitalListComponent,
        HospitalUpdateComponent
    ]
})
export class HospitalModule { }