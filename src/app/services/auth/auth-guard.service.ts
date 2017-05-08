import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthBaseService } from './auth-base.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private authBaseService: AuthBaseService, private router: Router) { }

    public canActivate() {
        console.log('canActivate');
        return this.checkIsLogin();
    }

    public canActivateChild() {
        console.log('canActivateChild');
        return this.checkIsLogin();
    }

    public checkIsLogin() {
        let isLoggedIn = this.authBaseService.isLoggedInObs();
        isLoggedIn.subscribe((loggedIn: boolean) => {
            if (!loggedIn) {
                // 提示跳转
                console.log(this.router.url);
                this.authBaseService.startSigninMainWindow();
            }
        });
        return isLoggedIn;
    }
}
