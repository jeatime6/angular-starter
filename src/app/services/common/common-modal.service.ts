import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
    CommonAlertComponent,
    CommonAlertContext
} from '../../components/common/common-alert/common-alert.component';
import {
    CommonLoadingComponent,
    CommonLoadingContext
} from '../../components/common/common-loading/common-loading.component';

import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

/**
 * 弹框组件必须实现该接口
 * 
 * @export
 * @interface ICommonModalService
 */
export interface ICommonModalService {
    /**
     * 打开modal后调用
     * 一般用作给组件传初始数据
     * @type {Function}
     * @memberOf ICommonModal
     */
    afterOpen: Function;

    /**
     * 关闭modal
     * 一般用作准备回传数据
     * @type {Function}
     * @memberOf ICommonModal
     */
    close: Function;
}

@Injectable()
export class CommonModalService {

    constructor(private modalService: NgbModal) { }

    
    /**
     * 打开一个提示框
     * 
     * @param {CommonAlertContext} [context] 
     * @returns {Observable<boolean>} 
     * 
     * @memberOf CommonModalService
     */
    public openAlert(context?: CommonAlertContext): Observable<boolean> {
        let modalInstance = this.open(CommonAlertComponent, context, {
            size: 'sm',
            keyboard: false,
            backdrop: 'static'
        })
        return Observable.fromPromise(modalInstance.result).map((res) => !!res);
    }

    /**
     * 打开一个loading等待遮罩
     * 
     * @param {CommonLoadingContext} [context] 
     * @returns {any}
     * 
     * @memberOf CommonModalService
     */
    public openLoading(context?: CommonLoadingContext): any {
        let modalInstance = this.open(CommonLoadingComponent, context, {
            size: 'sm',
            keyboard: false,
            backdrop: 'static',
            windowClass: 'busy-loading'
        });
        return modalInstance;
    }

    
    /**
     * 打开自定义弹框组件
     * 
     * @param {*} modalComponent 
     * @param {*} [modalContext] 
     * @param {NgbModalOptions} [options] 
     * @returns {Observable<any>} 
     * 
     * @memberOf CommonModalService
     */
    public openModal(modalComponent: any, modalContext?: any, options?: NgbModalOptions): Observable<any> {
        let modalInstance = this.open(modalComponent, modalContext, options);
        return Observable.fromPromise(modalInstance.result);
    }


    
    /**
     * ng-bootstrap modal 简单封装
     * 
     * @private
     * @param {*} modalComponent 
     * @param {*} [modalContext] 
     * @param {NgbModalOptions} [options] 
     * @returns 
     * 
     * @memberOf CommonModalService
     */
    private open(modalComponent: any, modalContext?: any, options?: NgbModalOptions) {
        let modal = this.modalService.open(modalComponent, options);
        modal.componentInstance.afterOpen(modalContext);
        return modal.componentInstance;
    }
}