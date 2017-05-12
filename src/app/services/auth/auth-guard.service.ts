import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    Router,
    Event,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';

import { Store } from '@ngrx/store';
import { ADD_LOADING, REMOVE_LOADING, REMOVEALL_LOADING } from '../../actions/layout-sidebar.action';

import { AuthBaseService } from './auth-base.service';
import { CommonModalService } from '../common/common-modal.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private authBaseService: AuthBaseService,
        private commonModalService: CommonModalService,
        private busyLoading$: Store<string[]>
    ) {
        // this.router.events.subscribe((event: Event) => {
        //     console.log(event);
        //     if (event instanceof NavigationStart) {
        //         this.busyLoading$.dispatch({ type: ADD_LOADING, payload: 'ROUTELOADING' });
        //     }
        //     if (event instanceof NavigationEnd
        //         || event instanceof NavigationCancel
        //         || event instanceof NavigationError) {
        //         this.busyLoading$.dispatch({ type: REMOVE_LOADING, payload: 'ROUTELOADING' });
        //     }
        // });
    }

    public canActivate() {
        // console.log('canActivate');
        return this.checkIsLogin();
    }

    public canActivateChild() {
        // console.log('canActivateChild');
        return this.checkIsLogin();
    }

    public checkIsLogin() {
        let isLoggedIn = this.authBaseService.isLoggedInObs();
        isLoggedIn.subscribe((loggedIn: boolean) => {
            if (!loggedIn) {
                // 提示跳转
                this.commonModalService
                    .openAlert({ message: '请先登陆！' })
                    .subscribe((res) => {
                        this.authBaseService.startSigninMainWindow();
                    });
            }
        });
        return isLoggedIn;
    }
}
