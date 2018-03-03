import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorListComponent } from './inspector-list.component';

describe('InspectorListComponent', () => {
  let component: InspectorListComponent;
  let fixture: ComponentFixture<InspectorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
