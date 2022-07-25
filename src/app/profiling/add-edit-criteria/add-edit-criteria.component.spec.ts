import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCriteriaComponent } from './add-edit-criteria.component';

describe('AddEditCriteriaComponent', () => {
  let component: AddEditCriteriaComponent;
  let fixture: ComponentFixture<AddEditCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
