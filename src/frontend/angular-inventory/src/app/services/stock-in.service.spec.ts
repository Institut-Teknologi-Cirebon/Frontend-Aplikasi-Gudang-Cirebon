import { TestBed } from '@angular/core/testing';

import { StockInService } from './stock-in.service';

describe('StockService', () => {
  let service: StockInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
