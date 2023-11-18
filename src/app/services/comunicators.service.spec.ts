import { TestBed } from '@angular/core/testing';

import { ComunicatorsService } from './comunicators.service';

describe('ComunicatorsService', () => {
  let service: ComunicatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
