import { TestBed } from '@angular/core/testing';

import { StockApiService } from './alpha-vantage-api.service';

describe('StockApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockApiService = TestBed.get(StockApiService);
    expect(service).toBeTruthy();
  });
});
