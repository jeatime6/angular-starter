import { Routes } from '@angular/router';

import { CommonLayoutComponent } from './components/common';


export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        data: {
            title: '首页'
        },
        children: [
            {
                path: 'hospital',
                loadChildren: './components/hospital#HospitalIndexModule'
            },
        ]
    }
];

