import { TestBed } from '@angular/core/testing';

import { RefuelsService } from './shared/refuels.service';

describe('RefuelsService', () => {
  let service: RefuelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefuelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
