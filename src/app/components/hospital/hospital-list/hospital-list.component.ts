import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Observable, Subscription } from 'rxjs';
import { ConceptHospitalType } from 'crabyter-p0-server/Enum';
import {
  SequencePaganitionViewModel,
  T_ConceptDetailViewModel
} from 'crabyter-p0-server/ViewModel';

import { CommonAlertComponent } from '../../common/common-alert/common-alert.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { HospitalConfigHelper } from '../../../models/HospitalConfigModel';
import { AuthBaseService, HospitalService } from '../../../services';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit, OnDestroy {

  public pageIndex$ = new Subject<number>();

  public subscribleHospital: Subscription;
  public hospitalPageInfo = <SequencePaganitionViewModel>
  {
    PageSize: 10,
    PageNumber: 1,
    Sequences: [] as T_ConceptDetailViewModel[]
  };

  constructor(
    private router: Router,
    private authBaseService: AuthBaseService,
    private hospitalService: HospitalService,
    private modalService: NgbModal
  ) {
    this.subscribleHospital = this.pageIndex$.asObservable()
      .flatMap((pageIndex) => {
        console.log(pageIndex);
        return this.hospitalService.getHospitals(pageIndex);
      })
      .subscribe((data) => {
        this.hospitalPageInfo = data;
      });
  }

  ngOnInit() {
    this.pageIndexChange(1);
  }

  ngOnDestroy() {
    this.subscribleHospital.unsubscribe();
  }

  /**
   * 换页
   * 
   * @param {any} pageIndex 
   * 
   * @memberof HospitalListComponent
   */
  public pageIndexChange(pageIndex) {
    this.pageIndex$.next(pageIndex);
  }

  /**
   * 跳转到编辑页面
   * 
   * @param {string} hospitalId 
   * 
   * @memberOf HospitalListComponent
   */
  public loadUpdatePage(hospitalId: string) {
    this.router.navigate([`/hospital/update/${hospitalId}`]);
  }

  /**
   * 删除医院
   */
  public deleteHospital(hospitalId: string) {
    let modalAlert = this.modalService
      .open(CommonAlertComponent, <NgbModalOptions>{
        size: 'sm',
        keyboard: false,
        backdrop: 'static'
      });
    modalAlert.componentInstance.setConfig({ isAlert: false, message: '确定删除吗？' });
    modalAlert.result.then((res) => {
      if (res) {
        this.hospitalService.deleteHospital(hospitalId).subscribe((data) => {

        });
      }
    });
  }
}