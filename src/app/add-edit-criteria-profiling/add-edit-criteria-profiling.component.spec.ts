import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCriteriaProfilingComponent } from './add-edit-criteria-profiling.component';

describe('AddEditCriteriaProfilingComponent', () => {
  let component: AddEditCriteriaProfilingComponent;
  let fixture: ComponentFixture<AddEditCriteriaProfilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCriteriaProfilingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCriteriaProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
