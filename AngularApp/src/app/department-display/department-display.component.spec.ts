import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDisplayComponent } from './department-display.component';

describe('DepartmentDisplayComponent', () => {
  let component: DepartmentDisplayComponent;
  let fixture: ComponentFixture<DepartmentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
