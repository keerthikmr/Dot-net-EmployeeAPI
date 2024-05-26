import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDisplayComponent } from './salary-display.component';

describe('SalaryDisplayComponent', () => {
  let component: SalaryDisplayComponent;
  let fixture: ComponentFixture<SalaryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
