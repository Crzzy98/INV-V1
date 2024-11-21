import { TestBed } from '@angular/core/testing';

import { AutoTradeService } from './auto-trade.service';

describe('AutoTradeService', () => {
  let service: AutoTradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoTradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
