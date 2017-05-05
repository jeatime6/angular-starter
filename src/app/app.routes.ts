import { Routes } from '@angular/router';

import { LayoutComponent, DashboardComponent } from './components/public';

import { HospitalIndexComponent } from './components/hospital';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
        ]
    }
];

export const CHILDROUTES: Routes = [];
