import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeentriesComponent } from './timeentries.component';

describe('TimeentriesComponent', () => {
  let component: TimeentriesComponent;
  let fixture: ComponentFixture<TimeentriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeentriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeentriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
