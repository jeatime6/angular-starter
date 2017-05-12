/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonModalService } from './common-modal.service';

describe('Service: CommonModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonModalService]
    });
  });

  it('should ...', inject([CommonModalService], (service: CommonModalService) => {
    expect(service).toBeTruthy();
  }));
});