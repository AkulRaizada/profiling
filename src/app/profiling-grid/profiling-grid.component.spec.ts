import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilingGridComponent } from './profiling-grid.component';

describe('ProfilingGridComponent', () => {
  let component: ProfilingGridComponent;
  let fixture: ComponentFixture<ProfilingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilingGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
