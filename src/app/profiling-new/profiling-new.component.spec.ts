import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilingNewComponent } from './profiling-new.component';

describe('ProfilingNewComponent', () => {
  let component: ProfilingNewComponent;
  let fixture: ComponentFixture<ProfilingNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilingNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
