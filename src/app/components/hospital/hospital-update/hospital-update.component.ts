import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonAlertComponent } from '../../common/common-alert/common-alert.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { T_ConceptDetailViewModel } from 'crabyter-p0-server/ViewModel';
import { ConceptHospitalType, ConceptHospitalLevel } from 'crabyter-p0-server/Enum';

import { HospitalService } from '../../../services';
import { ConceptHospitalModel, HospitalConfigHelper } from '../../../models/HospitalConfigModel';

@Component({
  selector: 'app-hospital-update',
  templateUrl: './hospital-update.component.html',
  styleUrls: ['./hospital-update.component.css']
})
export class HospitalUpdateComponent implements OnInit {

  // 模板绑定数据
  hospitalDetail = <ConceptHospitalModel>{};

  enumConceptHospitalType = ConceptHospitalType;
  enumConceptHospitalLevel = ConceptHospitalLevel;

  constructor(
    private hospitalService: HospitalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      
    });
  }

  submitHospital() {
    let hospital = this.hospitalService.createHospitalModel(this.hospitalDetail);
    console.log(hospital);
    this.hospitalService.addHospital(hospital)
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

  back() {
    this.router.navigate(['/hospital']);
  }
}