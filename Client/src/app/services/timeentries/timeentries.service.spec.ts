import { TestBed } from '@angular/core/testing';

import { TimeentriesService } from './timeentries.service';

describe('TimeentriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeentriesService = TestBed.get(TimeentriesService);
    expect(service).toBeTruthy();
  });
});
