import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit {

  public page = 4;

  constructor() { }

  ngOnInit() {
  }

}