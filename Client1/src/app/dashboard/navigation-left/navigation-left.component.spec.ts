import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLeftComponent } from './navigation-left.component';

describe('NavigationLeftComponent', () => {
  let component: NavigationLeftComponent;
  let fixture: ComponentFixture<NavigationLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
