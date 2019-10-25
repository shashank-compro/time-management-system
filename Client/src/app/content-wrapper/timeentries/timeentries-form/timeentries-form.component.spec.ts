import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeentriesFormComponent } from './timeentries-form.component';

describe('TimeentriesFormComponent', () => {
  let component: TimeentriesFormComponent;
  let fixture: ComponentFixture<TimeentriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeentriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeentriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
