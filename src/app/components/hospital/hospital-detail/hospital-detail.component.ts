import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-hospital-detail',
  templateUrl: './hospital-detail.component.html',
  styleUrls: ['./hospital-detail.component.css']
})
export class HospitalDetailComponent implements OnInit, OnDestroy {

  private params$: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.params$ = this.activatedRoute.params.switch()

  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }

}