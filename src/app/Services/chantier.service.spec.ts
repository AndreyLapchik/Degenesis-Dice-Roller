/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChantierService } from './chantier.service';

describe('Service: Chantier', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChantierService]
    });
  });

  it('should ...', inject([ChantierService], (service: ChantierService) => {
    expect(service).toBeTruthy();
  }));
});
