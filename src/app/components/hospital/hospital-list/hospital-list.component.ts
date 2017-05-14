import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Observable, Subscription } from 'rxjs';

import {
  SequencePaganitionViewModel,
  T_ConceptDetailViewModel
} from 'crabyter-p0-server/ViewModel';
import { ConceptHospitalType, ConceptHospitalLevel } from 'crabyter-p0-server/Enum';

import { ConceptHospitalModel, HospitalConfigHelper } from '../../../models/HospitalConfigModel';
import { AuthBaseService, HospitalService, CommonModalService } from '../../../services';

import _ from 'lodash';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit, OnDestroy {

  public pageIndex$ = new Subject<number>();
  public pageData: Array<ConceptHospitalModel> = [];

  public subscribleHospital: Subscription;
  public hospitalPageInfo = <SequencePaganitionViewModel>
  {
    PageSize: 10,
    PageNumber: 1,
    Sequences: [] as T_ConceptDetailViewModel[]
  };

  enumConceptHospitalType = ConceptHospitalType;
  enumConceptHospitalLevel = ConceptHospitalLevel;

  constructor(
    private router: Router,
    private authBaseService: AuthBaseService,
    private hospitalService: HospitalService,
    private commonModalService: CommonModalService
  ) {
    this.subscribleHospital = this.pageIndex$.asObservable()
      .flatMap((pageIndex) => {
        // console.log(pageIndex);
        return this.hospitalService.getHospitals(pageIndex);
      })
      .do((data) => {
        this.hospitalPageInfo = data;
        // 生成医院信息实体
        this.pageData = [];
        this.hospitalPageInfo.Sequences.forEach((element) => {
          this.pageData.push(this.hospitalService.createHospitalModel(element));
        });
      })
      .subscribe();
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
    this.commonModalService.openAlert({ isAlert: false, message: '确定删除吗？' })
      .filter((res) => res)
      .flatMap((res) => {
        return this.hospitalService.deleteHospital(hospitalId);
      })
      .do((res) => {
        _.remove(this.pageData, (item) => {
          return item.ConceptID === hospitalId;
        });
      })
      .subscribe();
  }
}