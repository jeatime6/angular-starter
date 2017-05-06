
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HospitalIndexRoutes } from './hospital-index.routing';
import { HospitalIndexComponent } from './hospital-index.component';
import { HospitalAddComponent } from '../hospital-add/hospital-add.component';
import { HospitalDetailComponent } from '../hospital-detail/hospital-detail.component';


@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    HospitalIndexRoutes
  ],
  declarations: [
    HospitalIndexComponent,
    HospitalAddComponent,
    HospitalDetailComponent
  ]
})
export class HospitalIndexModule { }