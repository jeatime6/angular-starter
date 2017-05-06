import { Routes, RouterModule } from '@angular/router';

import { HospitalIndexComponent } from './hospital-index.component';
import { HospitalAddComponent } from '../hospital-add/hospital-add.component';
import { HospitalDetailComponent } from '../hospital-detail/hospital-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HospitalIndexComponent
  },
  {
    path: 'add',
    component: HospitalAddComponent
  },
  {
    path: 'detail',
    component: HospitalDetailComponent
  }
];

export const HospitalIndexRoutes = RouterModule.forChild(routes);
