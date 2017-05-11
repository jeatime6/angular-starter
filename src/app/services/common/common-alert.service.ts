import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
    CommonAlertComponent,
    CommonAlertContext
} from '../../components/common/common-alert/common-alert.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CommonAlertService {

    constructor(private modalService: NgbModal) { }

    /**
     * 打开一个提示框
     * 
     * @param {CommonAlertContext} [context] 
     * @returns {Observable<boolean>} 
     * 
     * @memberof CommonAlertService
     */
    public openModal(context?: any): Observable<boolean> {
        let modalAlert = this.modalService
            .open(CommonAlertComponent, <NgbModalOptions>{
                size: 'sm',
                keyboard: false,
                backdrop: 'static'
            });
        modalAlert.componentInstance.setConfig(context);
        return Observable.fromPromise(modalAlert.result).map((res) => !!res);
    }
}