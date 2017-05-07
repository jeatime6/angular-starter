import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthBaseService } from './auth-base.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authBaseService: AuthBaseService, private router: Router) { }

    canActivate() {
        const isLoggedIn = this.authBaseService.isLoggedInObs();
        isLoggedIn.subscribe(loggedin => {
            if (!loggedin) {
                // 提示跳转
                console.log(this.router.url);
                this.router.navigate(['/auth']);
            }
        });
        return isLoggedIn;
    }
}
