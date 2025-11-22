import { TestBed } from '@angular/core/testing';

import { Tier } from './tier';

describe('Tier', () => {
  let service: Tier;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tier);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
