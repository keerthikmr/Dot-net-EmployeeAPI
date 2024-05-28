import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditFormComponent } from './emp-edit-form.component';

describe('EmpEditFormComponent', () => {
  let component: EmpEditFormComponent;
  let fixture: ComponentFixture<EmpEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
