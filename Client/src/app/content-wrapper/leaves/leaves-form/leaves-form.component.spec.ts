import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesFormComponent } from './leaves-form.component';

describe('LeavesFormComponent', () => {
  let component: LeavesFormComponent;
  let fixture: ComponentFixture<LeavesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
