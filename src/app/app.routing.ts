import { Routes } from '@angular/router';

import { CommonLayoutComponent } from './components/common';

export const ROUTES: Routes = [
    {
        path: '',
        component: CommonLayoutComponent,
        data: {
            title: '首页'
        },
        children: [
            {
                path: 'hospital',
                data: {
                    title: '医院管理'
                },
                loadChildren: './components/hospital#HospitalModule'
            },
        ]
    }
];

