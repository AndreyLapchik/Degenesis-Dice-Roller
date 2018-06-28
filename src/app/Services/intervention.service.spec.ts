/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InterventionService } from './intervention.service';

describe('Service: Intervention', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterventionService]
    });
  });

  it('should ...', inject([InterventionService], (service: InterventionService) => {
    expect(service).toBeTruthy();
  }));
});
