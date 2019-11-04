import { TestBed } from '@angular/core/testing';

import { LeavesModalService } from './leaves-modal.service';

describe('LeavesModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeavesModalService = TestBed.get(LeavesModalService);
    expect(service).toBeTruthy();
  });
});
