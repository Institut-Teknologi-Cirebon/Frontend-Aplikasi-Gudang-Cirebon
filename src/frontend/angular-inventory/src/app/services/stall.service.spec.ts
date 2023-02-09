import { TestBed } from '@angular/core/testing';

import { StallService } from './stall.service';

describe('StallService', () => {
  let service: StallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
