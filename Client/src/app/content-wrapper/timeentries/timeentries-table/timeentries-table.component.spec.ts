import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeentriesTableComponent } from './timeentries-table.component';

describe('TimeentriesTableComponent', () => {
  let component: TimeentriesTableComponent;
  let fixture: ComponentFixture<TimeentriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeentriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeentriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
