/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonAlertService } from './common-alert.service';

describe('Service: CommonAlert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonAlertService]
    });
  });

  it('should ...', inject([CommonAlertService], (service: CommonAlertService) => {
    expect(service).toBeTruthy();
  }));
});