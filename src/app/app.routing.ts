import { Routes } from '@angular/router';

import { CommonAuthComponent, CommonLayoutComponent } from './components/common';

import { AuthGuardService } from './services';

export const ROUTES: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuardService],
        component: CommonLayoutComponent,
        data: {
            title: '首页'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                data: {
                    title: 'Dashboard'
                },
                loadChildren: './components/dashboard#DashboardModule'
            },
            {
                path: 'hospital',
                data: {
                    title: '医院管理'
                },
                loadChildren: './components/hospital#HospitalModule'
            }
        ]
    },
    {
        path: 'auth',
        component: CommonAuthComponent
    }
];

