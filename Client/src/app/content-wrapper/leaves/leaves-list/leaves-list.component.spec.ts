import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesListComponent } from './leaves-list.component';

describe('LeavesListComponent', () => {
  let component: LeavesListComponent;
  let fixture: ComponentFixture<LeavesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
