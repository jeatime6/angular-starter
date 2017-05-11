import { Component } from '@angular/core';

import { NgbModal, NgbActiveModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import _ from 'lodash';

export interface CommonAlertContext {
  /**
   * 是否是提示框
   */
  isAlert: boolean;
  /**
   * 标题
   */
  title?: string;
  /**
   * 内容
   */
  message?: string;
  /**
   * 确定按钮文字
   */
  ok?: string;
  /**
   * 取消按钮文字
   */
  cancel?: string;
}

@Component({
  selector: 'app-common-alert',
  templateUrl: './common-alert.component.html',
  styleUrls: ['./common-alert.component.css']
})
export class CommonAlertComponent {

  context = <CommonAlertContext>{
    isAlert: true,
    title: '提示',
    ok: '确定',
    cancel: '取消'
  };

  constructor(public activeModal: NgbActiveModal) {

  }

  /**
   * 设置显示类型
   * 
   * @param {CommonAlertContext} options 
   * 
   * @memberOf CommonAlertComponent
   */
  setConfig(options?: any) {
    _.extend(this.context, options);
    return this;
  }

  /**
   * 关闭弹出框
   * 
   * @param {boolean} isOk 
   * 
   * @memberOf CommonAlertComponent
   */
  close(isOk: boolean) {
    this.activeModal.close(isOk);
  }


}