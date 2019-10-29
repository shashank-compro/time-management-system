import { TestBed } from '@angular/core/testing';

import { TimeentriesModalService } from './timeentries-modal.service';

describe('TimeentriesModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeentriesModalService = TestBed.get(TimeentriesModalService);
    expect(service).toBeTruthy();
  });
});
