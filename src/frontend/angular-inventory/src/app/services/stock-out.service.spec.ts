import { TestBed } from '@angular/core/testing';

import { StockOutService } from './stock-out.service';

describe('StockOutService', () => {
  let service: StockOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
