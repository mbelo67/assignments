import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsFrontComponent } from './assignments-front.component';

describe('AssignmentsFrontComponent', () => {
  let component: AssignmentsFrontComponent;
  let fixture: ComponentFixture<AssignmentsFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentsFrontComponent]
    });
    fixture = TestBed.createComponent(AssignmentsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
