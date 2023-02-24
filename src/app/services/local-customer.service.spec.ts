import { TestBed } from '@angular/core/testing';

import { LocalCustomerService } from './local-customer.service';

describe('LocalCustomerService', () => {
  let service: LocalCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
