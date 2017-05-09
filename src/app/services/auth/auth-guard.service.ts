import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { CommonAlertComponent } from '../../components/common/common-alert/common-alert.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AuthBaseService } from './auth-base.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        private authBaseService: AuthBaseService,
        private router: Router,
        private modalService: NgbModal
    ) { }

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
                let modalAlert = this.modalService
                    .open(CommonAlertComponent, <NgbModalOptions>{
                        size: 'sm',
                        keyboard: false,
                        backdrop: 'static'
                    });
                modalAlert.componentInstance.setConfig({ message: '请先登陆！' });
                modalAlert.result.then((res) => {
                    // console.log(res);
                    this.authBaseService.startSigninMainWindow();
                });
            }
        });
        return isLoggedIn;
    }
}
