import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeentryComponent } from './timeentry.component';

describe('TimeentryComponent', () => {
  let component: TimeentryComponent;
  let fixture: ComponentFixture<TimeentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
