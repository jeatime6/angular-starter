import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { T_ConceptDetailViewModel, ProvinceAndCityDataViewModel } from 'crabyter-p0-server/ViewModel';
import { ConceptHospitalType, ConceptHospitalLevel } from 'crabyter-p0-server/Enum';

import { HospitalService, CommonModalService } from '../../../services';
import { ConceptHospitalModel, HospitalConfigHelper } from '../../../models/HospitalConfigModel';

import _ from 'lodash';

@Component({
  selector: 'app-hospital-update',
  templateUrl: './hospital-update.component.html',
  styleUrls: ['./hospital-update.component.css']
})
export class HospitalUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('selectProvice') selectProvice: ElementRef;
  @ViewChild('selectCity') selectCity: ElementRef;

  proviceData: Array<ProvinceAndCityDataViewModel> = [];
  cityData: Array<ProvinceAndCityDataViewModel> = [];
  countyData: Array<ProvinceAndCityDataViewModel> = []

  // 获取医院信息
  private hospital$: Subscription;

  // 模板绑定数据
  hospitalId: string;
  hospitalDetail = <ConceptHospitalModel>{};

  enumConceptHospitalType = ConceptHospitalType;
  enumConceptHospitalLevel = ConceptHospitalLevel;

  constructor(
    private hospitalService: HospitalService,
    private commonModalService: CommonModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
      .flatMap((id) => {
        return this.hospitalService.getHospital(id);
      })
      .do((data) => {
        this.hospitalDetail = this.hospitalService.createHospitalModel(data);
        console.log(this.hospitalDetail);
      }).subscribe();
  }

  ngOnInit() {
    // 获取省份信息
    this.hospitalService.getProvinceInfo().subscribe((data) => {
      this.proviceData = data;
    });

    // 切换省
    Observable.fromEvent(this.selectProvice.nativeElement, 'change')
      .debounceTime(500)
      .do((event) => { console.log(event); })
      .map((event: { target: any }) => event.target.value)
      .flatMap((provinceId: string) => {
        if (_.isNil(provinceId)) {
          return Observable.of([] as ProvinceAndCityDataViewModel[]);
        } else {
          return this.hospitalService.getProvinceInfo(provinceId);
        }
      })
      .do((cities) => {
        this.cityData = cities;
        this.countyData = [];
      })
      .subscribe();
    // 切换市
    Observable.fromEvent(this.selectCity.nativeElement, 'change')
  }

  ngOnDestroy() {
    this.hospital$.unsubscribe();
  }

  /**
   * 提交修改
   * 
   * 
   * @memberOf HospitalUpdateComponent
   */
  public submitHospital() {
    let hospital = this.hospitalService.createConceptHospitalModel(this.hospitalDetail);
    hospital.ConceptID = this.hospitalId;
    console.log(hospital);

    this.hospitalService.updateHospital(this.hospitalId, hospital)
      .filter((hospital) => {
        return !_.isNil(hospital);
      })
      .do((hospital) => {
        this.commonModalService.openAlert({ message: '修改成功！' });
      }).subscribe();
  }


  /**
   * 返回
   * 
   * 
   * @memberOf HospitalUpdateComponent
   */
  public back() {
    this.router.navigate(['/hospital']);
  }
}  