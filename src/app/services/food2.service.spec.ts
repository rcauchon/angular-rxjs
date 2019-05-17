import { TestBed } from '@angular/core/testing';

import { Food2Service } from './food2.service';

describe('Food2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Food2Service = TestBed.get(Food2Service);
    expect(service).toBeTruthy();
  });
});
