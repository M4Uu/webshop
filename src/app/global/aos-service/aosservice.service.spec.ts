import { TestBed } from '@angular/core/testing';

import { AOSserviceService } from './aosservice.service';

describe('AOSserviceService', () => {
  let service: AOSserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AOSserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
