import { TestBed } from '@angular/core/testing';

import { MisService } from './mis.service';

describe('MisService', () => {
  let service: MisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
