import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PschometricAnalysisComponent } from './pschometric-analysis.component';

describe('PschometricAnalysisComponent', () => {
  let component: PschometricAnalysisComponent;
  let fixture: ComponentFixture<PschometricAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PschometricAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PschometricAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
