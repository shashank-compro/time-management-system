import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeentriesModalComponent } from './timeentries-modal.component';

describe('TimeentriesModalComponent', () => {
  let component: TimeentriesModalComponent;
  let fixture: ComponentFixture<TimeentriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeentriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeentriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
