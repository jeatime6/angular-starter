/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthBaseService } from './auth-base.service';

describe('Service: AuthBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthBaseService]
    });
  });

  it('should ...', inject([AuthBaseService], (service: AuthBaseService) => {
    expect(service).toBeTruthy();
  }));
});