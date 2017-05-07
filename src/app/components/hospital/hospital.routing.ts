import { Routes, RouterModule } from '@angular/router';

import { HospitalComponent } from './hospital.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalAddComponent } from './hospital-add/hospital-add.component';
import { HospitalDetailComponent } from './hospital-detail/hospital-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HospitalComponent,
    children: [
      {
        path: '',
        data: {
          title: '医院列表'
        },
        component: HospitalListComponent
      },
      {
        path: 'add',
        data: {
          title: '添加医院'
        },
        component: HospitalAddComponent
      },
      {
        path: 'detail',
        data: {
          title: '医院详情'
        },
        component: HospitalDetailComponent
      }
    ]
  }
];

export const HospitalRoutes = RouterModule.forChild(routes);
