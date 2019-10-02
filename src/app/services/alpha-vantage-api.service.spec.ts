import { TestBed } from '@angular/core/testing';

import { AlphaVantageApiService } from './alpha-vantage-api.service';

describe('AlphaVantageApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlphaVantageApiService = TestBed.get(AlphaVantageApiService);
    expect(service).toBeTruthy();
  });
});
