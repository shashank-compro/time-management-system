import { TestBed } from '@angular/core/testing';

import { LeavesDataService } from './leaves-data.service';

describe('LeavesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeavesDataService = TestBed.get(LeavesDataService);
    expect(service).toBeTruthy();
  });
});
