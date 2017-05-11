import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonAlertComponent } from '../../common/common-alert/common-alert.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { T_ConceptDetailViewModel } from 'crabyter-p0-server/ViewModel';
import { ConceptHospitalType, ConceptHospitalLevel } from 'crabyter-p0-server/Enum';

import { HospitalService } from '../../../services';
import { ConceptHospitalModel, HospitalConfigHelper } from '../../../models/HospitalConfigModel';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css']
})
export class HospitalAddComponent implements OnInit {

  // 模板绑定数据
  hospitalDetail = <ConceptHospitalModel>{};

  enumConceptHospitalType = ConceptHospitalType;
  enumConceptHospitalLevel = ConceptHospitalLevel;

  constructor
    (
    private hospitalService: HospitalService,
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit() {

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



