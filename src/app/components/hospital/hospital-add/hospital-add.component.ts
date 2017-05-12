import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { T_ConceptDetailViewModel } from 'crabyter-p0-server/ViewModel';
import { ConceptHospitalType, ConceptHospitalLevel } from 'crabyter-p0-server/Enum';

import { HospitalService, CommonAlertService } from '../../../services';
import { ConceptHospitalModel, HospitalConfigHelper } from '../../../models/HospitalConfigModel';

import _ from 'lodash';

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
    private commonAlertService: CommonAlertService,
    private hospitalService: HospitalService,
    private router: Router
    ) { }

  ngOnInit() {

  }

  public submitHospital() {
    let hospital = this.hospitalService.createConceptHospitalModel(this.hospitalDetail);
    console.log(hospital);
    this.hospitalService.addHospital(hospital)
      .filter((hospital) => !_.isNil(hospital))
      .switch((hospital) => { this.commonAlertService.openModal(); })
      .map(()=>{});

      // .subscribe((data) => {
      //   this.commonAlertService.openModal({ isAlert: false, message: '添加成功！是否继续添加？' })
      //     .subscribe((res) => {
      //       if (res) {
      //         this.hospitalDetail = <ConceptHospitalModel>{};
      //       } else {
      //         this.router.navigate(['/hospital']);
      //       }
      //     });
      // });
  }

  public back() {
    this.router.navigate(['/hospital']);
  }
}



