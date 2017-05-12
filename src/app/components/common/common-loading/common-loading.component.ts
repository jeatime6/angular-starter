import { Component } from '@angular/core';

import { NgbModal, NgbActiveModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ICommonModalService } from '../../../services/common/common-modal.service';

import _ from 'lodash';

export interface CommonLoadingContext {
  delayTime: number;
  overTime: number;
  message: string;
}

@Component({
  selector: 'app-common-loading',
  templateUrl: './common-loading.component.html',
  styleUrls: ['./common-loading.component.css']
})
export class CommonLoadingComponent implements ICommonModalService {

  context = <CommonLoadingContext>{
    delayTime: 500,
    overTime: 10000,
    message: '正在拼命的加载...'
  };

  constructor
    (
    public activeModal: NgbActiveModal
    ) { }

  afterOpen(options?: any) {
    _.extend(this.context, options);
  }

  close() {
    this.activeModal.close(true);
  }
}