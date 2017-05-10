import { Component, OnInit } from '@angular/core';

import { Map } from 'immutable';
import { Subject, Observable, Subscription } from 'rxjs';
import { ConceptHospitalType } from 'crabyter-p0-server/Enum';
import {
  SequencePaganitionViewModel,
  T_ConceptDetailViewModel
} from 'crabyter-p0-server/ViewModel';

import { HospitalConfigMap } from '../../../models/HospitalConfigModel';
import { HospitalService } from '../../../services';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit {

  public pageIndex$ = new Subject<number>();
  public hospitalPageInfo = <SequencePaganitionViewModel>
  {
    Sequences: [] as T_ConceptDetailViewModel[]
  };

  constructor(private hospitalService: HospitalService) { 
    this.pageIndex$.next(1);
  }

  ngOnInit() {
      // this.pageIndex$.asObservable().do((pageIndex)=>{
      //   return this.hospitalService.getHospital(pageIndex);
      // })

    this.hospitalService.getHospitals().subscribe((data) => {
      this.hospitalPageInfo = data;
    });
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
}