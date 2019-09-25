import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTopComponent } from './navigation-top.component';

describe('NavigationTopComponent', () => {
  let component: NavigationTopComponent;
  let fixture: ComponentFixture<NavigationTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
