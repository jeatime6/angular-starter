
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { T_ConceptDetailViewModel, ProvinceAndCityDataViewModel } from 'crabyter-p0-server/ViewModel';
import { ConceptHospitalType, ConceptHospitalLevel } from 'crabyter-p0-server/Enum';

import { HospitalService, CommonModalService } from '../../../services';
import { ConceptHospitalModel, HospitalConfigHelper } from '../../../models/HospitalConfigModel';

import { Observable } from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css']
})
export class HospitalAddComponent implements OnInit {
  @ViewChild('selectProvice') selectProvice: ElementRef;
  @ViewChild('selectCity') selectCity: ElementRef;

  proviceData: Array<ProvinceAndCityDataViewModel> = [];
  cityData: Array<ProvinceAndCityDataViewModel> = [];
  countyData: Array<ProvinceAndCityDataViewModel> = []

  // 模板绑定数据
  hospitalDetail = <ConceptHospitalModel>{};

  enumConceptHospitalType = ConceptHospitalType;
  enumConceptHospitalLevel = ConceptHospitalLevel;

  constructor
    (
    private commonModalService: CommonModalService,
    private hospitalService: HospitalService,
    private router: Router
    ) { }

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
      .debounceTime(500)
      .map((event: { target: any }) => event.target.value)
      .flatMap((provinceId: string) => {
        if (_.isNil(provinceId)) {
          return Observable.of([] as ProvinceAndCityDataViewModel[]);
        } else {
          return this.hospitalService.getProvinceInfo(provinceId);
        }
      })
      .do((counties) => {
        this.countyData = counties;
      })
      .subscribe();
  }



  /**
   * 提交
   * 
   * 
   * @memberOf HospitalAddComponent
   */
  public submitHospital() {
    let hospital = this.hospitalService.createConceptHospitalModel(this.hospitalDetail);
    console.log(hospital);

    this.hospitalService.addHospital(hospital)
      .filter((hospital) => {
        return !_.isNil(hospital);
      })
      .flatMap((hospital) => {
        return this.commonModalService.openAlert({ isAlert: false, message: '添加成功！是否继续添加？' });
      })
      .do((res) => {
        if (res) {
          this.hospitalDetail = <ConceptHospitalModel>{};
        } else {
          this.router.navigate(['/hospital']);
        }
      }).take(1).subscribe();
  }

  /**
   * 返回上一级
   * 
   * 
   * @memberOf HospitalAddComponent
   */
  public back() {
    this.router.navigate(['/hospital']);
  }
}



