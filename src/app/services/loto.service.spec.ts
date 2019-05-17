import { TestBed } from '@angular/core/testing';

import { LotoService } from './loto.service';

describe('LotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LotoService = TestBed.get(LotoService);
    expect(service).toBeTruthy();
  });
});
