import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDisplayComponent } from './emp-display.component';

describe('EmpDisplayComponent', () => {
  let component: EmpDisplayComponent;
  let fixture: ComponentFixture<EmpDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
