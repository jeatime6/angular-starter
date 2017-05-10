import { Routes } from '@angular/router';

import {
    CommonAuthComponent,
    CommonUnauthComponent,
    CommonLayoutComponent,
    CommonNotfoundComponent,
    CommonUnavailableComponent
} from './components/common';

import { AuthGuardService } from './services';

export const ROUTES: Routes = [
    {
        path: '',
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
                // canActivateChild: [AuthGuardService],
                loadChildren: './components/dashboard#DashboardModule'
            },
            {
                path: 'hospital',
                data: {
                    title: '医院管理'
                },
                // canActivateChild: [AuthGuardService],
                loadChildren: './components/hospital#HospitalModule'
            }
        ]
    },
    {
        path: 'authorize',
        component: CommonAuthComponent
    },
    {
        path: 'unauthorize',
        component: CommonUnauthComponent
    },
    {
        path: '404',
        component: CommonNotfoundComponent
    },
    {
        path: '500',
        component: CommonUnavailableComponent
    }
];

