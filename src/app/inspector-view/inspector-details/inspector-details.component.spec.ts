import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorDetailsComponent } from './inspector-details.component';

describe('InspectorDetailsComponent', () => {
  let component: InspectorDetailsComponent;
  let fixture: ComponentFixture<InspectorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
