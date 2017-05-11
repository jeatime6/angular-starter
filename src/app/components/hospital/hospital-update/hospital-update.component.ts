import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { CommonAlertComponent } from '../../common/common-alert/common-alert.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { T_ConceptDetailViewModel } from 'crabyter-p0-server/ViewModel';
import { ConceptHospitalType, ConceptHospitalLevel } from 'crabyter-p0-server/Enum';

import { HospitalService } from '../../../services';
import { ConceptHospitalModel, HospitalConfigHelper } from '../../../models/HospitalConfigModel';

import _ from 'lodash';

@Component({
  selector: 'app-hospital-update',
  templateUrl: './hospital-update.component.html',
  styleUrls: ['./hospital-update.component.css']
})
export class HospitalUpdateComponent implements OnInit, OnDestroy {

  private hospital$: Subscription;

  // 模板绑定数据
  hospitalId: string;
  hospitalDetail = <ConceptHospitalModel>{};

  enumConceptHospitalType = ConceptHospitalType;
  enumConceptHospitalLevel = ConceptHospitalLevel;

  constructor(
    private hospitalService: HospitalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.hospital$ = this.activatedRoute.params
      .map((params): string => {
        return params['hospitalid'];
      })
      .filter((id) => {
        return !_.isNil(id);
      })
      .do((id) => {
        this.hospitalId = id;
      })
      .switchMap((id) => {
        return this.hospitalService.getHospital(id);
      })
      .do((data) => {
        this.hospitalDetail = this.hospitalService.createHospitalModel(data);
      }).subscribe();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.hospital$.unsubscribe();
  }

  public submitHospital() {
    let hospital = this.hospitalService.createConceptHospitalModel(this.hospitalDetail);
    hospital.ConceptID = this.hospitalId;
    console.log(hospital);
    this.hospitalService.updateHospital(this.hospitalId, hospital)
      .subscribe((data) => {
        let modalAlert = this.modalService
          .open(CommonAlertComponent, <NgbModalOptions>{
            size: 'sm',
            keyboard: false,
            backdrop: 'static'
          });
        modalAlert.componentInstance.setConfig({ isAlert: false, message: '添加成功！是否继续添加？' });
        modalAlert.result.then((res) => {
          if (res) {
            this.hospitalDetail = <ConceptHospitalModel>{};
          } else {
            this.router.navigate(['/hospital']);
          }
        });
      });
  }

  public back() {
    this.router.navigate(['/hospital']);
  }
  H