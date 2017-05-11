import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthBaseService } from './auth-base.service';
import { CommonAlertService } from '../common/common-alert.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private authBaseService: AuthBaseService,
        private commonAlertService: CommonAlertService
    ) {
        // this.router.events.subscribe((event) => {
        //     console.log(event);
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
                this.commonAlertService
                    .openModal({ message: '请先登陆！' })
                    .subscribe((res) => {
                        this.authBaseService.startSigninMainWindow();
                    });
            }
        });
        return isLoggedIn;
    }
}
