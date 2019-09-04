import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPageWrapperComponent } from './content-page-wrapper.component';

describe('ContentPageWrapperComponent', () => {
  let component: ContentPageWrapperComponent;
  let fixture: ComponentFixture<ContentPageWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPageWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
