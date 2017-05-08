/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommonUnauthComponent } from './common-unauth.component';

describe('CommonUnauthComponent', () => {
  let component: CommonUnauthComponent;
  let fixture: ComponentFixture<CommonUnauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonUnauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonUnauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});